# Kotrana — Frontend Angular

Depuis `frontend/` :

```powershell
npm ci
npm start       # http://localhost:4200 ; proxy API vers localhost:8000
npm run build
npm test -- --watch=false --browsers=ChromeHeadless
```

La commande `npm start` utilise Angular CLI installé dans le projet.
Démarrer aussi le backend et appliquer les migrations existantes avant de tester.

Les vues chargent les statistiques, demandes, comptes, agents et contenus municipaux
via l'API. Elles se rafraîchissent toutes les 30 secondes, au retour sur un onglet
et après une modification réussie. Les autres onglets reçoivent un signal de mise
à jour sans donnée personnelle. Le rafraîchissement attend la fermeture des
formulaires d'administration pour préserver les saisies.

L'accueil public présente des totaux anonymes et les publications effectivement
publiées. L'espace citoyen et son historique utilisent `/requests` avec les statuts
français et le filtre serveur `mine=true`. L'espace agent conserve son API existante.
Les dates du tableau de bord suivent `APP_TIMEZONE`, configuré côté backend.

La session conserve le token d'accès en mémoire et se restaure avec le cookie
HttpOnly de refresh. Les routes et les endpoints appliquent les droits de chaque rôle.
Les vues Terra Nova possèdent déjà leur propre rafraîchissement.
