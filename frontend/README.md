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

Les pages publiques `/municipal`, `/municipal/services`, `/municipal/publications`
et `/municipal/contact` sont accessibles sans connexion. Les cartes ouvrent
le service ou la publication sur toute leur surface et restent utilisables au clavier.
Le contact présélectionne le service, conserve le message en cas d’échec,
empêche un double envoi et affiche une confirmation persistante avec référence
et date après l’enregistrement effectif en base. Les dates sont affichées en français.

Le profil `/home/profile`, accessible depuis « Mon espace » et les menus du compte,
permet de modifier son nom, son email et son mot de passe. Les changements demandent
le mot de passe actuel et actualisent la session en mémoire. Un citoyen peut supprimer
son compte après confirmation et vérification de son mot de passe ; il est alors
déconnecté et ses anciens accès sont refusés par l’API. Les demandes municipales
conservent leur contenu et leur suivi sous l’identité « Compte supprimé ».
La page s’adapte au mobile et désactive ses animations lorsque la préférence système
de réduction des mouvements est activée.
