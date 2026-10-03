# Domaines

À tenir à jour pendant le hackathon : une ligne par domaine, mise à jour à chaque merge.

Statuts : 🟢 terminé · 🟡 en cours · ⚪ à faire · ⛔ abandonné

| Domaine | Statut | Endpoints (`/api/v1`) | Porteur | Notes |
|---|---|---|---|---|
| `health` | 🟢 | `GET /health` | — | Défini dans `main.py`, pas un domaine |
| `user` | 🟢 | `POST /users` · `GET /users` · `GET /users/{id}` · `PUT /users/{id}` · `DELETE /users/{id}` | — | Domaine modèle à copier |
| `agent` | 🟢 | `POST /agents` · `GET /agents` · `GET /agents/{id}` · `PATCH /agents/{id}` · `POST /agents/{id}/deactivate` · `POST /agents/{id}/activate` · `GET /agents/{id}/interventions` | — | Jamais supprimé, seulement désactivé. Interventions = demandes citoyennes attribuées (`citizen_requests.assigned_agent_id` → `agents.id`) ; un agent désactivé ne peut plus être attribué (`AgentInactiveError`, 400). `use_cases/` en package : un fichier par action |
| `terra_request` | 🟢 | `GET /terra-requests` · `GET /terra-requests/session` · `POST /terra-requests/sync` · `GET /terra-requests/pipeline` · `GET /terra-requests/notifications` · `POST /terra-requests/notifications/read-all` · `POST /terra-requests/notifications/{key}/read` · `GET /terra-requests/{code}` · `PATCH /terra-requests/{code}/status` | — | Demandes du concours (API Terra Nova) synchronisées toutes les 30 s ; réservé au personnel (agent, gestionnaire, admin). Voir section dédiée ci-dessous |
| | | | | |

### terra_request — reçu à H+0 (D19, espace des services municipaux)

- Demande : espace de travail distinct de l'espace citoyen où le personnel consulte les informations
  transmises par l'API Terra Nova (session, demandes, nouvelles demandes, suivi en Kanban).
- Priorité : obligatoire
- Règles métier :
  - `request_code` est l'identifiant stable : jamais de doublon, une demande connue est mise à jour
    sans perdre son statut de pipeline ;
  - XP repris tels quels de l'API (jamais recalculés) ;
  - synchronisation à intervalle fixe (`TERRA_NOVA_SYNC_SECONDS`, 30 s) : boucle de fond lancée au
    démarrage + resynchro à la lecture de `/session` si les données ont vieilli (Passenger peut
    endormir le processus). Le compte à rebours de la prochaine vague est purement affiché ;
  - notifications dérivées des demandes (une par demande, une par vague), état « lu » par utilisateur.
- Endpoints : voir le tableau ci-dessus (`/api/v1/terra-requests…`).
- Exceptions métier : `TerraRequestNotFoundError` (404), `TerraFeedUnavailableError` (503).
- Fichiers hors patron (> 7) :
  - `domain/terra_request/repository.py` contient aussi le port `TerraFeed` (API externe) ;
  - `infrastructure/external/terra_nova_feed.py` — client HTTP de l'API (stdlib, aucune dépendance) ;
  - `bootstrap.py` — boucle de synchronisation en tâche de fond (seul endroit autorisé à relier
    use cases et infrastructure hors router).

## Modèle vierge

Copier ce bloc pour chaque nouvelle demande reçue pendant le hackathon.

```markdown
### <domaine> — reçu à <heure>

- Demande : <résumé de la fonctionnalité demandée>
- Priorité : obligatoire | bonus | ignorée (raison)
- Règles métier :
  - …
- Endpoints :
  - `POST /<domaines>` — …
- Exceptions métier : `<Domaine>NotFoundError` (404), …
- Fichiers hors patron (> 7) : aucun | <fichier> — <justification>
```
