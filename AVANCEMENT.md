# Terra Nova : état d'avancement (4 octobre 2026)

## 1. Ce qui est fait

### Base réparée : connexion par téléphone / SMS
Ce travail est dans la copie de travail `dev`. Il n'est pas commité.

- **Corrections pour un compte sans email** :
  - import manquant de `Role` dans `features/auth/schemas.py` ;
  - unicité email et téléphone vérifiée à la création comme à la modification d'un compte ;
  - le téléphone est pris en compte dans la recherche, l'audit, l'export des données, les agents, les signalements et la recherche globale.
- **Migration** : `c4e8b2d71a56` fusionne les deux têtes Alembic (téléphone et publications). La base locale est migrée, avec une sauvegarde dans le scratchpad (`trav_wc_before_phone.dump`).
- **Configuration** : variables `SMS_GATEWAY_*` ajoutées à `.env.example`.
- **Frontend** : `profile.ts` corrigé ; specs adaptées (champ `identifier`, `contact`, `phone`, `phone_verified`).
- **Tests** : backend 391 OK, frontend 126 OK, ruff propre.

### Lot « Informer » : terminé
Branche `tn/informer`, commit `b7d2e83`. Ce lot n'est pas encore fusionné dans `dev`.

Selon le rapport de l'agent, dans sa copie isolée : backend 420 OK, frontend 139 OK, ruff propre.

| Code | Contenu |
|---|---|
| D18 / F29 / F73 | Alertes et messages officiels : bandeau (niveau, consignes, zone, public, émetteur), historique sur 30 jours, page d'administration (manager / admin), audit |
| F30 | Notification « Alerte » dans la cloche + email optionnel aux citoyens vérifiés (en tâche de fond) |
| F31 | Recommandations proposées par l'IA (Gemini) dans le formulaire d'alerte ; une réponse 503 claire si l'IA est indisponible |
| D16 / F83 | Référence `TN-AAAA-XXXXXXXX` pour chaque demande, confirmation après envoi, accusé de réception imprimable / PDF / .txt, recherche par référence |

- **Migration** : `a1f3c5e70101` (table `alerts`).
- **Limites** :
  - le public visé est indiqué dans l'alerte, mais pas ciblé : tout le monde la voit ;
  - l'email part une seule fois, à la publication ;
  - le PDF passe par l'impression du navigateur.

## 2. Ce qui est commencé mais pas fini (arrêté)

Le travail en cours de chaque lot est commité sur sa branche `tn/<lot>` comme « travail en cours ». Ces lots n'ont pas été testés jusqu'au bout.

| Lot | Branche | Codes | Où en était l'agent |
|---|---|---|---|
| Demandes | `tn/demandes` | F52, F75, F84 | Presque fini : frontend vert (137), vérification finale non faite |
| Accueil et langues | `tn/accueil` | D12, F35, F72, D14, F27, F71 | Backend vert ; frontend i18n (service, pipes, sélecteur de langue) en cours |
| Services | `tn/services` | F38, F63, F64, F36, F46, D13 | Backend écrit ; frontend en cours |
| Participation | `tn/participation` | F65, F66, F67, F68, F76 | Backend écrit ; specs frontend en cours |
| Rendez-vous | `tn/rendezvous` | F39, F40 | Backend écrit ; modèle et service frontend en cours |
| Sécurité et sobriété | `tn/securite` | F54, F69, F81, F82, F57–F62, F77, F78 | Infrastructure backend écrite (rate limit, garde de formulaire, appareils connus) ; `conftest`, migration et frontend non faits |

## 3. Pour reprendre

1. Relancer chaque lot inachevé depuis sa branche `tn/<lot>`. Les copies de travail isolées sont dans le scratchpad de la session.
2. Fusionner les branches `tn/*`. Les conflits attendus portent sur :
   - `models.py`, `main.py` ;
   - `app.routes.ts`, `app.menu.ts`, `journal.model.ts` ;
   - `audit/entities.py` ;
   - `generate_frontend_enums.py` / `api-enums.ts`.
3. Ajouter une migration Alembic de fusion des 7 têtes (toutes partent de `c4e8b2d71a56`), puis lancer `make enums`.
4. Lancer tous les tests : `uv run pytest -q`, `ruff`, `tsc`, `ng test`.
5. Rebuild de production : `npx ng build --configuration production`. Ensuite commit, push et déploiement.

## 4. À faire côté serveur (prod)

- Ajouter dans le `.env` serveur : `SMS_GATEWAY_API_KEY`, `SMS_GATEWAY_FROM`, `SMS_GATEWAY_TIMEOUT_SECONDS`.
- **SMTP** : l'erreur 503 en prod n'est toujours pas résolue. Vérifier les variables `SMTP_*` et le port, puis lire `/home/bugskiller/logs/hodifly-webcup-main.log`.
- `GOOGLE_CLIENT_ID` est vide en prod.
- Changer les identifiants partagés dans la conversation : mot de passe Neon et mot de passe SMTP.
