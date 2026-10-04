export const environment = {
    // Production (Hodify) : le frontend et l'API sont sur deux sous-domaines distincts.
    // Le .htaccess du frontend renvoie tout vers index.html : un chemin relatif /api/v1 n'atteint pas l'API.
    apiUrl: 'https://api.bugskiller.madagascar.webcup.hodi.cloud',
    // Sans surcharge, le WebSocket reprend l'origine et le chemin de l'API en HTTPS.
    realtimeUrl: '',
    googleClientId: ''
};
