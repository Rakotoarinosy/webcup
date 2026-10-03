# Bugs Killer — Backend

Backend du projet de l'équipe **Bugs Killer** pour le concours WebCup. API REST consommée par
le frontend Angular (`../frontend`).

Construit avec FastAPI, SQLAlchemy 2 et Alembic, en **Clean Architecture Lite** : un domaine
métier pur, des use cases isolés et des repositories interchangeables. Chaque nouvelle
fonctionnalité se crée en copiant le domaine `user`.

## Prérequis

- Python 3.12+
- [uv](https://docs.astral.sh/uv/) (recommandé), sinon pip : le Makefile choisit tout seul
- `make`
- Docker (optionnel)

## Installation et lancement

Depuis `backend/` :

```bash
make install    # dépendances + .env créé depuis .env.example
make migrate    # crée ./app.db (SQLite) et applique toutes les migrations
make dev        # http://localhost:8000
```

Après un `git pull` ou une fusion qui ajoute des migrations, relancer `make migrate`
avant de démarrer l'API. La migration `a7d3e91b4c20` crée notamment
`terra_requests`, `terra_sessions` et `terra_request_reads` ; sans elle, la
synchronisation Terra Nova échoue avec `no such table: terra_sessions`.

Sous PowerShell, sans `make`, exécuter depuis `backend/` :

```powershell
uv sync --extra dev
uv run alembic upgrade head
uv run alembic current  # doit afficher la révision courante (head)
uv run uvicorn src.main:app --reload
```

Avec l'URL SQLite par défaut (`sqlite:///./app.db`), lancer Alembic et l'API depuis
le même dossier `backend/` pour utiliser la même base.

| URL | Contenu |
|---|---|
| <http://localhost:8000/api/v1/health> | `{"status": "ok"}` |
| <http://localhost:8000/docs> | Scalar |
| <http://localhost:8000/redoc> | ReDoc |

La documentation interactive est masquée quand `ENVIRONMENT=production`.

Avec Docker : `make docker-up` (hot reload, même `./app.db`). Pour PostgreSQL, décommenter le
service `db` dans `docker-compose.yml`.

## Configuration

Toutes les variables sont dans [.env.example](.env.example) :

| Variable | Défaut | Rôle |
|---|---|---|
| `ENVIRONMENT` | `development` | `production` : logs JSON, documentation masquée |
| `DATABASE_URL` | `sqlite:///./app.db` | PostgreSQL : `postgresql+psycopg://user:pass@host:5432/db` |
| `CORS_ORIGINS` | `http://localhost:4200` | Origines autorisées, séparées par des virgules |
| `LOG_LEVEL` | `INFO` | `DEBUG`, `INFO`, `WARNING`, `ERROR` |
| `SECRET_KEY` | `change-me-in-production` | À remplacer en production |
| `TERRA_NOVA_API_KEY` | — | Clé de l'équipe pour l'API Terra Nova (suivi `/home/terra-nova`) |
| `TERRA_NOVA_SYNC_SECONDS` | `30` | Intervalle d'interrogation de l'API Terra Nova |
| `TERRA_NOVA_BACKGROUND_SYNC` | `true` | `false` : pas de boucle de fond, synchro à la lecture seulement |

## Exemples d'appels (domaine `user`)

```bash
# Créer
curl -X POST http://localhost:8000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{"email": "ada@example.com", "name": "Ada"}'
# → 201 {"id": "0272…", "email": "ada@example.com", "name": "Ada", "created_at": "…Z"}

# Lister / détail
curl http://localhost:8000/api/v1/users
curl http://localhost:8000/api/v1/users/<id>

# Modifier (partiel)
curl -X PUT http://localhost:8000/api/v1/users/<id> \
  -H "Content-Type: application/json" \
  -d '{"name": "Ada Lovelace"}'

# Supprimer
curl -X DELETE http://localhost:8000/api/v1/users/<id>   # → 204
```

Format des erreurs métier :

```json
{ "error": "UserAlreadyExistsError", "detail": "A user with email 'ada@example.com' already exists" }
```

`*NotFoundError` → 404, `*AlreadyExistsError` → 409, autres erreurs métier → 400,
validation → 422.

## Commandes

```bash
make help                          # liste toutes les commandes
make test                          # tests unitaires, intégration, e2e et architecture
make lint                          # ruff + black --check + mypy strict
make format                        # ruff --fix + black
make revision m="add products"     # nouvelle migration (autogenerate)
make migrate                       # applique les migrations
make requirements                  # régénère requirements.txt (déploiement Passenger)
make clean                         # caches + app.db
```

## Déploiement (Passenger)

`passenger_wsgi.py` expose l'app ASGI en WSGI grâce à `a2wsgi`. Sur le serveur :
`pip install -r requirements.txt`, créer le `.env` (avec `ENVIRONMENT=production` et une vraie
`SECRET_KEY`), puis `alembic upgrade head`. Après toute modification des dépendances, lancer
`make requirements`.

## Documentation

- [docs/architecture.md](docs/architecture.md) : les couches, le flux d'une requête, les règles
  de dépendance et l'ajout d'un domaine en 5 étapes
- [docs/conventions.md](docs/conventions.md) : le nommage, des exemples de code et la checklist
  avant merge
- [docs/features.md](docs/features.md) : le suivi des domaines pendant le hackathon

## Structure

```text
backend/
├── src/
│   ├── domain/           # cœur métier, Python pur
│   ├── features/         # use cases, schémas, routers
│   ├── infrastructure/   # base de données, config, logs
│   ├── shared/           # handlers d'erreurs
│   └── main.py
├── tests/                # unit/ · integration/ · e2e/
├── alembic/              # migrations
├── docs/
├── Dockerfile · docker-compose.yml · Makefile
└── pyproject.toml
```
