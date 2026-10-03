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
    created_at: string;
    /** Dérivés du profil (jamais stockés sur le compte) : profil agent, et institut de l'agent ou géré. */
    agent_id: string | null;
    institut_id: string | null;
}

/** Réponse de /auth/login et /auth/refresh (TokenOut). */
export interface TokenResponse {
    access_token: string;
    token_type: 'bearer';
    expires_in: number;
    user: AuthUser;
}
