export const environment = {
    // Production (Hodify) : le frontend et l'API sont sur deux sous-domaines distincts.
    // Le .htaccess du frontend renvoie tout vers index.html : un chemin relatif /api/v1 n'atteint pas l'API.
    apiUrl: 'https://api.bugskiller.madagascar.webcup.hodi.cloud',
    // Le serveur expose les WebSockets sur le préfixe API FastAPI.
    realtimeUrl: 'wss://api.bugskiller.madagascar.webcup.hodi.cloud/api/v1/realtime',
    googleClientId: ''
};
