"""refonte : instituts, profils agents, CitizenRequest unique et journal d'événements

- crée `instituts` (un par département d'agent existant) ;
- les agents deviennent des profils : user_id (compte créé si besoin) + institut_id ;
  email, name et department migrent vers users / instituts ;
- users.agent_id disparaît (le lien est porté par agents.user_id) ;
- citizen_requests reçoit les champs de l'ancienne entité Demande + institut_id ;
- citizen_request_events remplace demande_events et citizen_request_status_history ;
- les lignes de `demandes` (s'il y en a) sont recopiées dans citizen_requests ;
- notification_reads est créée si elle manquait (aucune migration ne la créait).

Migration de données irréversible : downgrade() refuse de s'exécuter.

Revision ID: b8e4f2a91c37
Revises: d11c0f4e8a21
Create Date: 2026-10-03 18:00:00.000000

"""

import json
import unicodedata
from collections.abc import Sequence
from datetime import UTC, datetime
from uuid import uuid4

import sqlalchemy as sa
from alembic import op

revision: str = "b8e4f2a91c37"
down_revision: str | Sequence[str] | None = "d11c0f4e8a21"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None

# Valeurs figées ici : une migration ne doit pas dépendre du code applicatif, qui évoluera.
CATEGORIES = [
    "Éclairage public",
    "Voirie",
    "Eau",
    "Déchets",
    "Sécurité",
    "Espaces verts",
    "Autre",
]
DEMANDE_CATEGORY = {
    "eclairage_public": "Éclairage public",
    "voirie": "Voirie",
    "eau": "Eau",
    "dechets": "Déchets",
    "securite": "Sécurité",
    "espaces_verts": "Espaces verts",
    "autre": "Autre",
}
DEMANDE_PRIORITY = {
    "faible": "Basse",
    "moyenne": "Normale",
    "haute": "Haute",
    "critique": "Urgente",
}
DEMANDE_STATUS = {
    "nouveau": "Nouveau",
    "en_cours": "En cours",
    "en_attente": "En attente",
    "resolu": "Résolu",
    "rejete": "Rejeté",
}
# Types de demande_events → citizen_request_events (ACCEPTED devient un changement de statut).
DEMANDE_EVENT_TYPE = {"accepted": "status_changed"}
DEFAULT_INSTITUT = "Services généraux"


def upgrade() -> None:
    bind = op.get_bind()
    tables = set(sa.inspect(bind).get_table_names())
    now = datetime.now(UTC)

    _create_instituts()
    _migrate_agents(bind, now)
    _drop_user_agent_link()
    _extend_citizen_requests(bind)
    _create_events()
    if "demandes" in tables:
        _copy_demandes(bind, tables)
    _history_to_events(bind, tables)
    _ensure_created_events(bind)
    if "notification_reads" not in tables:
        _create_notification_reads()

    for table in ("demande_events", "demandes", "citizen_request_status_history"):
        if table in tables:
            op.drop_table(table)


def downgrade() -> None:
    raise NotImplementedError(
        "Migration de données irréversible : restaurer la sauvegarde de la base d'avant la refonte."
    )


# ─── instituts ───────────────────────────────────────────────────────


def _create_instituts() -> None:
    op.create_table(
        "instituts",
        sa.Column("id", sa.String(length=36), nullable=False),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("description", sa.Text(), nullable=False, server_default=""),
        sa.Column("categories", sa.JSON(), nullable=False),
        sa.Column("manager_id", sa.String(length=36), nullable=True),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(
            ["manager_id"], ["users.id"], name="instituts_manager_id_fkey", ondelete="SET NULL"
        ),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("name", name="uq_instituts_name"),
        sa.UniqueConstraint("manager_id", name="uq_instituts_manager_id"),
    )


def _category_for(department: str) -> str | None:
    key = _fold(department)
    return next((category for category in CATEGORIES if _fold(category) == key), None)


def _fold(text: str) -> str:
    ascii_text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode()
    return ascii_text.strip().lower()


# ─── agents → profils ────────────────────────────────────────────────


def _migrate_agents(bind, now: datetime) -> None:
    with op.batch_alter_table("agents") as batch:
        batch.add_column(sa.Column("user_id", sa.String(length=36), nullable=True))
        batch.add_column(sa.Column("institut_id", sa.String(length=36), nullable=True))

    agents = (
        bind.execute(
            sa.text("SELECT id, email, name, department, is_active, created_at FROM agents")
        )
        .mappings()
        .all()
    )
    linked = dict(
        bind.execute(sa.text("SELECT agent_id, id FROM users WHERE agent_id IS NOT NULL")).all()
    )

    instituts: dict[str, str] = {}  # nom → id
    taken_categories: set[str] = set()
    for agent in agents:
        user_id = linked.get(agent["id"]) or _user_for_agent(bind, agent, now)

        name = (agent["department"] or "").strip() or DEFAULT_INSTITUT
        if name.casefold() not in instituts:
            category = _category_for(name)
            # Une catégorie n'appartient qu'à un seul institut actif.
            categories = [category] if category and category not in taken_categories else []
            taken_categories.update(categories)
            institut_id = str(uuid4())
            bind.execute(
                sa.text(
                    "INSERT INTO instituts (id, name, description, categories, is_active, created_at)"
                    " VALUES (:id, :name, '', :categories, :active, :created_at)"
                ).bindparams(sa.bindparam("categories", type_=sa.JSON())),
                {
                    "id": institut_id,
                    "name": name,
                    "categories": categories,
                    "active": True,
                    "created_at": now,
                },
            )
            instituts[name.casefold()] = institut_id

        bind.execute(
            sa.text(
                "UPDATE agents SET user_id = :user_id, institut_id = :institut_id WHERE id = :id"
            ),
            {"user_id": user_id, "institut_id": instituts[name.casefold()], "id": agent["id"]},
        )

    with op.batch_alter_table("agents") as batch:
        batch.alter_column("user_id", existing_type=sa.String(length=36), nullable=False)
        batch.alter_column("institut_id", existing_type=sa.String(length=36), nullable=False)
        batch.create_unique_constraint("uq_agents_user_id", ["user_id"])
        batch.create_foreign_key(
            "agents_user_id_fkey", "users", ["user_id"], ["id"], ondelete="CASCADE"
        )
        batch.create_foreign_key("agents_institut_id_fkey", "instituts", ["institut_id"], ["id"])
        batch.create_index("ix_agents_institut_id", ["institut_id"])
        batch.drop_index("ix_agents_email")
        batch.drop_column("email")
        batch.drop_column("name")
        batch.drop_column("department")


def _user_for_agent(bind, agent, now: datetime) -> str:
    """Compte de l'agent : retrouvé par email, sinon créé (sans mot de passe : à définir par l'admin)."""
    email = agent["email"].strip().lower()
    existing = bind.execute(
        sa.text("SELECT id FROM users WHERE lower(email) = :email"), {"email": email}
    ).scalar()
    if existing is not None:
        return existing

    user_id = str(uuid4())
    bind.execute(
        sa.text(
            "INSERT INTO users (id, email, name, password_hash, role, is_active,"
            " failed_login_attempts, created_at)"
            " VALUES (:id, :email, :name, '', 'agent', :active, 0, :created_at)"
        ),
        {
            "id": user_id,
            "email": email,
            "name": agent["name"],
            "active": agent["is_active"],
            "created_at": agent["created_at"] or now,
        },
    )
    return user_id


def _drop_user_agent_link() -> None:
    with op.batch_alter_table("users") as batch:
        batch.drop_constraint("users_agent_id_fkey", type_="foreignkey")
        batch.drop_constraint("uq_users_agent_id", type_="unique")
        batch.drop_column("agent_id")


# ─── citizen_requests ────────────────────────────────────────────────


def _extend_citizen_requests(bind) -> None:
    with op.batch_alter_table("citizen_requests") as batch:
        batch.add_column(sa.Column("updated_at", sa.DateTime(timezone=True), nullable=True))
        batch.add_column(sa.Column("scheduled_at", sa.DateTime(timezone=True), nullable=True))
        batch.add_column(sa.Column("urgency", sa.Integer(), nullable=False, server_default="3"))
        batch.add_column(
            sa.Column("affected_citizens", sa.Integer(), nullable=False, server_default="1")
        )
        batch.add_column(
            sa.Column("priority_score", sa.Integer(), nullable=False, server_default="0")
        )
        batch.add_column(sa.Column("institut_id", sa.String(length=36), nullable=True))
        batch.create_foreign_key(
            "citizen_requests_institut_id_fkey",
            "instituts",
            ["institut_id"],
            ["id"],
            ondelete="SET NULL",
        )
        batch.create_index("ix_citizen_requests_institut_id", ["institut_id"])

    bind.execute(
        sa.text("UPDATE citizen_requests SET updated_at = COALESCE(resolved_at, created_at)")
    )
    with op.batch_alter_table("citizen_requests") as batch:
        batch.alter_column("updated_at", existing_type=sa.DateTime(timezone=True), nullable=False)

    # Routage des demandes existantes vers l'institut de leur catégorie.
    rows = bind.execute(sa.text("SELECT id, categories FROM instituts")).all()
    for institut_id, categories in rows:
        for category in _as_list(categories):
            bind.execute(
                sa.text(
                    "UPDATE citizen_requests SET institut_id = :institut_id WHERE category = :category"
                ),
                {"institut_id": institut_id, "category": category},
            )


def _as_list(value) -> list[str]:
    if isinstance(value, str):
        return json.loads(value)
    return list(value or [])


# ─── journal d'événements ────────────────────────────────────────────


def _create_events() -> None:
    op.create_table(
        "citizen_request_events",
        sa.Column("id", sa.String(length=36), nullable=False),
        sa.Column("request_id", sa.String(length=36), nullable=False),
        sa.Column("type", sa.String(length=40), nullable=False),
        sa.Column("actor_id", sa.String(length=36), nullable=True),
        sa.Column("actor_name", sa.String(length=255), nullable=True),
        sa.Column("payload", sa.JSON(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(["request_id"], ["citizen_requests.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        "ix_citizen_request_events_request_created",
        "citizen_request_events",
        ["request_id", "created_at"],
    )
    op.create_index("ix_citizen_request_events_type", "citizen_request_events", ["type"])
    op.create_index("ix_citizen_request_events_actor_id", "citizen_request_events", ["actor_id"])


def _events_table() -> sa.Table:
    return sa.table(
        "citizen_request_events",
        sa.column("id", sa.String),
        sa.column("request_id", sa.String),
        sa.column("type", sa.String),
        sa.column("actor_id", sa.String),
        sa.column("actor_name", sa.String),
        sa.column("payload", sa.JSON),
        sa.column("created_at", sa.DateTime(timezone=True)),
    )


def _history_to_events(bind, tables: set[str]) -> None:
    if "citizen_request_status_history" not in tables:
        return
    events = _events_table()
    rows = bind.execute(
        sa.text(
            "SELECT h.request_id, h.status, h.created_at, r.citizen_id"
            " FROM citizen_request_status_history h"
            " JOIN citizen_requests r ON r.id = h.request_id"
            " ORDER BY h.request_id, h.created_at"
        )
    ).mappings()
    previous: dict[str, str] = {}
    for row in rows:
        before = previous.get(row["request_id"])
        if before is None:
            values = {"type": "created", "actor_id": row["citizen_id"], "payload": {}}
        else:
            event_type = {"Résolu": "resolved", "Rejeté": "rejected"}.get(
                row["status"], "status_changed"
            )
            values = {
                "type": event_type,
                "actor_id": None,
                "payload": {"from": before, "to": row["status"]},
            }
        bind.execute(
            events.insert().values(
                id=str(uuid4()),
                request_id=row["request_id"],
                actor_name=None,
                created_at=_dt(row["created_at"]),
                **values,
            )
        )
        previous[row["request_id"]] = row["status"]


def _ensure_created_events(bind) -> None:
    """Chaque demande a un événement de création : la timeline commence toujours quelque part."""
    events = _events_table()
    rows = bind.execute(
        sa.text(
            "SELECT r.id, r.citizen_id, r.created_at, r.title, r.category, r.priority"
            " FROM citizen_requests r"
            " WHERE NOT EXISTS (SELECT 1 FROM citizen_request_events e"
            "   WHERE e.request_id = r.id AND e.type = 'created')"
        )
    ).mappings()
    for row in rows:
        bind.execute(
            events.insert().values(
                id=str(uuid4()),
                request_id=row["id"],
                type="created",
                actor_id=row["citizen_id"],
                actor_name=None,
                payload={
                    "title": row["title"],
                    "category": row["category"],
                    "priority": row["priority"],
                },
                created_at=_dt(row["created_at"]),
            )
        )


# ─── ancienne table demandes ─────────────────────────────────────────


def _copy_demandes(bind, tables: set[str]) -> None:
    institut_by_category: dict[str, str] = {}
    for institut_id, categories in bind.execute(sa.text("SELECT id, categories FROM instituts")):
        for category in _as_list(categories):
            institut_by_category[category] = institut_id

    columns = {c["name"] for c in sa.inspect(bind).get_columns("demandes")}
    rows = bind.execute(sa.text("SELECT * FROM demandes")).mappings().all()
    for row in rows:
        category = DEMANDE_CATEGORY.get(row["category"], "Autre")
        status = DEMANDE_STATUS.get(row["status"], "Nouveau")
        bind.execute(
            sa.text(
                "INSERT INTO citizen_requests (id, title, description, category, priority, status,"
                " citizen_id, created_at, updated_at, location, latitude, longitude,"
                " assigned_agent_id, resolved_at, scheduled_at, urgency, affected_citizens,"
                " priority_score, institut_id)"
                " VALUES (:id, :title, :description, :category, :priority, :status, :citizen_id,"
                " :created_at, :updated_at, :location, :latitude, :longitude, :agent_id,"
                " :resolved_at, :scheduled_at, :urgency, :affected, :score, :institut_id)"
            ),
            {
                "id": row["id"],
                "title": row["title"],
                "description": row["description"],
                "category": category,
                "priority": DEMANDE_PRIORITY.get(row["priority"], "Normale"),
                "status": status,
                "citizen_id": row["citizen_id"],
                "created_at": row["created_at"],
                "updated_at": row["updated_at"] or row["created_at"],
                "location": row["address"] or "Adresse non précisée",
                "latitude": row["latitude"],
                "longitude": row["longitude"],
                "agent_id": row["agent_id"],
                "resolved_at": row["updated_at"] if status == "Résolu" else None,
                "scheduled_at": row["scheduled_at"],
                "urgency": row["urgency"] if "urgency" in columns else 3,
                "affected": row["affected_citizens"] if "affected_citizens" in columns else 1,
                "score": row["priority_score"] if "priority_score" in columns else 0,
                "institut_id": institut_by_category.get(category),
            },
        )

    if "demande_events" not in tables:
        return
    events = _events_table()
    for row in bind.execute(sa.text("SELECT * FROM demande_events")).mappings().all():
        bind.execute(
            events.insert().values(
                id=row["id"],
                request_id=row["demande_id"],
                type=DEMANDE_EVENT_TYPE.get(row["type"], row["type"]),
                actor_id=row["actor_id"],
                actor_name=row["actor_name"],
                payload=_as_payload(row["payload"]),
                created_at=_dt(row["created_at"]),
            )
        )


def _dt(value: datetime | str) -> datetime:
    # SQLite renvoie les dates des requêtes texte sous forme de chaînes.
    return datetime.fromisoformat(value) if isinstance(value, str) else value


def _as_payload(value) -> dict:
    if isinstance(value, str):
        return json.loads(value)
    return dict(value or {})


def _create_notification_reads() -> None:
    op.create_table(
        "notification_reads",
        sa.Column("user_id", sa.String(length=36), nullable=False),
        sa.Column("key", sa.String(length=80), nullable=False),
        sa.Column("read_at", sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("user_id", "key"),
    )
