export const environment = {
    // Base de l'API backend (FastAPI).
    // En dev, `ng serve` redirige /api vers le backend (voir proxy.conf.json).
    apiUrl: '/api/v1',
    // Connexion directe en développement : évite le WebSocket HMR de Vite sur :4200.
    // En production, renseigner l'URL wss:// publique du backend/reverse-proxy.
    realtimeUrl: 'ws://localhost:8000/api/v1/realtime'
};
