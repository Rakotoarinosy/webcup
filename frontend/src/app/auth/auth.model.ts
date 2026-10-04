import { Role } from '@/app/shared/api-enums';

export type { Role };

export const ROLE_LABELS: Record<Role, string> = {
    admin: 'Administrateur',
    manager: 'Gestionnaire',
    agent: 'Agent',
    citizen: 'Citoyen'
};

/** Profil renvoyé par l'API (ProfileOut). */
export interface AuthUser {
    id: string;
    /** Null pour un compte créé avec un numéro de téléphone. */
    email: string | null;
    /** Numéro au format international (+261341234567), null pour un compte créé avec un email. */
    phone: string | null;
    name: string;
    role: Role;
    created_at: string;
    /** Dérivés du profil (jamais stockés sur le compte) : profil agent, et institut de l'agent ou géré. */
    agent_id: string | null;
    institut_id: string | null;
    /** Email confirmé par code (false tant que l'inscription n'est pas validée). */
    email_verified: boolean;
    /** Téléphone confirmé par code SMS. */
    phone_verified: boolean;
    /** Photo du compte Google, sinon null. */
    avatar_url: string | null;
    has_password?: boolean;
    google_linked?: boolean;
}

/** Réponse de /auth/login, /auth/refresh et /auth/verify-code (TokenOut). */
export interface TokenResponse {
    access_token: string;
    token_type: 'bearer';
    expires_in: number;
    user: AuthUser;
}

/** Moyen de contact choisi sur les écrans de connexion et d'inscription. */
export type ContactMethod = 'email' | 'phone';

/** Canal par lequel le code a été envoyé. */
export type VerificationChannel = 'email' | 'sms';

/** Contact fourni à l'inscription : un email OU un numéro (jamais les deux). */
export type RegisterContact = { email: string } | { phone: string };

/** Réponse de /auth/register, /auth/google, /auth/resend-code et /auth/login (202) : ChallengeOut. */
export interface VerificationChallenge {
    challenge_id: string;
    channel: VerificationChannel;
    /** Email, ou numéro masqué (+261•••••67) pour un SMS. */
    destination: string;
    /** Compatibilité : renseigné seulement pour le canal email. */
    email?: string | null;
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
