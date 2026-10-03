export const environment = {
    // Base de l'API backend (FastAPI).
    // En dev, `ng serve` redirige /api vers http://localhost:8000 (voir proxy.conf.json).
    // En prod, le frontend et l'API doivent partager le domaine, ou mettre ici l'URL complète
    // de l'API (ex. 'https://api.mon-domaine.com/api/v1') et l'ajouter à CORS_ORIGINS côté backend.
    apiUrl: '/api/v1'
};
