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
    /** Email confirmé par code (false tant que l'inscription n'est pas validée). */
    email_verified: boolean;
    /** Photo du compte Google, sinon null. */
    avatar_url: string | null;
}

/** Réponse de /auth/login, /auth/refresh et /auth/verify-code (TokenOut). */
export interface TokenResponse {
    access_token: string;
    token_type: 'bearer';
    expires_in: number;
    user: AuthUser;
}

/** Réponse de /auth/register, /auth/google, /auth/resend-code et /auth/login (202) : ChallengeOut. */
export interface VerificationChallenge {
    challenge_id: string;
    email: string;
    /** Secondes avant expiration du code. */
    expires_in: number;
    /** Secondes avant qu'un nouveau code puisse être demandé. */
    resend_after: number;
}

/** Résultat d'une connexion par mot de passe : session ouverte, ou code à saisir d'abord. */
export type LoginOutcome = 'authenticated' | 'verification-required';

export function isChallenge(body: AuthUser | TokenResponse | VerificationChallenge): body is VerificationChallenge {
    return 'challenge_id' in body;
}
