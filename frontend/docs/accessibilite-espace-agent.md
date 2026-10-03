# Audit accessibilité minimal — espace agent

Date : 3 octobre 2026  
Cible : `/home/agent` (liste des demandes du domaine `/demandes`).

## Vérifications effectuées

- Structure : `main`, titres hiérarchisés, tableau avec légende et en-têtes `scope="col"`.
- Lecteur d’écran : état de chargement (`role="status"`), erreurs (`role="alert"`), pagination nommée, compte d’actions annoncé et bouton de résolution nommé avec le titre de la demande.
- Clavier : actions natives `<button>`, ordre de tabulation naturel, focus `:focus-visible` visible.
- Lisibilité : couleurs de texte et d’action définies avec des contrastes élevés sur fond clair; le statut est aussi écrit en toutes lettres et n’est pas indiqué par la couleur seule.
- Agrandissement : tailles typographiques en `rem`, tableau défilant horizontalement sur petit écran, résumé réorganisé en grille sans superposition.
- Langue du document déclarée en français (`lang="fr"`).

## Limite de l’audit automatisé

`axe-core` et Lighthouse ne sont pas présents dans les dépendances ou dans l’environnement local. L’audit axe/Lighthouse n’a donc pas pu être exécuté ici. Le build Angular confirme la compilation du composant, mais ne vaut pas une mesure automatisée des contrastes calculés ou une vérification au navigateur. À compléter sur l’instance connectée avec axe DevTools ou Lighthouse, en couvrant clavier, zoom 200 % et thème sombre.
