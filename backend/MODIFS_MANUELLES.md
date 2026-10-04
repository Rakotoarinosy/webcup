# Modifications à faire à la main (fichiers que je n'ai plus sur disque)

Les fichiers de ce zip remplacent les originaux. Les 5 ci-dessous portaient le même nom que d'autres
fichiers envoyés (`router.py`, `use_cases.py`), j'ai donc seulement les passages à changer.

## 0. Dépendances et migration
    uv add httpx          # httpx n'est aujourd'hui qu'une dépendance transitive de google-genai
    alembic upgrade head  # (make migrate)

## 1. `.env.example` / `.env`
    # httpSMS (laisser vide en dev : le code est alors écrit dans les logs)
    SMS_GATEWAY_API_KEY=        # httpsms.com/settings
    SMS_GATEWAY_FROM=+261341254338   # numéro de la SIM du téléphone, en E.164
    SMS_GATEWAY_TIMEOUT_SECONDS=10

## 2. `features/auth/router.py`
Ajouter `from src.domain.user.entities import Channel` aux imports, puis remplacer ces deux fonctions :

    def _profile(user: User, resolve: ActorResolver) -> ProfileOut:
        actor = resolve(user)
        return ProfileOut(
            id=user.id,
            email=user.email,
            phone=user.phone,
            name=user.name,
            role=user.role,
            created_at=user.created_at,
            agent_id=actor.agent_id,
            institut_id=actor.institut_id,
            email_verified=user.email_verified,
            phone_verified=user.phone_verified,
            avatar_url=user.avatar_url,
        )


    def _challenge_out(challenge: VerificationChallenge, response: Response) -> ChallengeOut:
        response.headers["Cache-Control"] = "no-store"

        return ChallengeOut(
            challenge_id=challenge.challenge_id,
            channel=challenge.channel.value,
            destination=challenge.destination,
            email=challenge.destination if challenge.channel is Channel.EMAIL else None,
            expires_in=challenge.expires_in,
            resend_after=challenge.resend_after,
        )

## 3. `features/user/use_cases.py`
Imports : `from src.domain.user.rules import ...` n'est pas nécessaire. Remplacer :

    # create_user : vérifier l'unicité de chaque contact fourni
    def create_user(dto, repo, hasher, audit=None) -> User:
        if dto.email and repo.get_by_email(dto.email):
            raise UserAlreadyExistsError(dto.email)
        if dto.phone and repo.get_by_phone(dto.phone):
            raise UserAlreadyExistsError(dto.phone)

        user = User(
            id=str(uuid.uuid4()),
            email=dto.email,
            phone=dto.phone,
            name=dto.name,
            created_at=datetime.now(UTC),
            password_hash=hasher.hash(dto.password),
            role=dto.role,
        )
        ... (le reste est inchangé)

    # list_accounts : la recherche couvre aussi le téléphone
        and (
            not needle
            or needle in user.name.casefold()
            or needle in (user.email or "").casefold()
            or needle in (user.phone or "")
        )

    # update_citizen_account ET update_user : remplacer le bloc « new_email » par
        new_email = changes.get("email")
        if new_email and new_email != user.email and repo.get_by_email(new_email):
            raise UserAlreadyExistsError(new_email)
        new_phone = changes.get("phone")
        if new_phone and new_phone != user.phone and repo.get_by_phone(new_phone):
            raise UserAlreadyExistsError(new_phone)

    # update_user : ajouter "phone" dans les deux listes
        for field in ("email", "phone", "name", "role", "is_active", "password"):
        sensitive = {"role", "is_active", "password_hash", "email", "phone"} & changes.keys()
    # update_citizen_account : {"email", "phone", "is_active"} & changes.keys()

    # record_account_changes
        diff = field_changes(before, after, ("name", "email", "phone"))

    # _label
    def _label(user: User) -> str:
        return f"{user.name} ({user.email or user.phone})"

    # update_own_profile : un compte « téléphone » peut ajouter un email, l'absence = inchangé
    def update_own_profile(user: User, dto: UpdateProfileIn, repo: UserRepository) -> User:
        changes: dict[str, str] = {"name": dto.name}
        if dto.email is not None:
            other = repo.get_by_email(dto.email)
            if other is not None and other.id != user.id:
                raise UserAlreadyExistsError(dto.email)
            changes["email"] = dto.email
        return repo.update(replace(user, **changes))

## 4. Export des données (`infrastructure/persistence/user_export_repository.py`)
`PersonalData.email` reste un `str` : passer `email=user.email or user.phone or ""`
(ou ajouter un champ `phone`). Sinon l'export plante pour un compte sans email.

## 5. Test existant à ajuster (`test_email_verification_api.py`, fonction `challenge`)
    assert set(body) == {"challenge_id", "channel", "destination", "email", "expires_in", "resend_after"}

## 6. Autres usages de `user.email` à vérifier
    grep -rn "\.email" backend/src | grep -v "dto\.\|payload\."
Tout ce qui suppose `str` (seed, bootstrap admin, agents, audit, notifications) doit tolérer `None`.
