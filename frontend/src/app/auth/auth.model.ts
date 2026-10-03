export type Role = 'admin' | 'manager' | 'agent' | 'citizen';

export const ROLE_LABELS: Record<Role, string> = {
    admin: 'Administrateur',
    manager: 'Gestionnaire',
    agent: 'Agent',
    citizen: 'Citoyen'
};

/** Profil renvoyé par l'API (ProfileOut). */
export interface AuthUser {
    id: string;
    email: string;
    name: string;
    role: Role;
    agent_id: string | null;
    created_at: string;
}

/** Réponse de /auth/login et /auth/refresh (TokenOut). */
export interface TokenResponse {
    access_token: string;
    token_type: 'bearer';
    expires_in: number;
    user: AuthUser;
}
