import { Role } from '../auth/auth.model';

/** Contrats de l'administration des comptes (/users). */
export interface User {
    id: string;
    email: string;
    name: string;
    role: Role;
    is_active: boolean;
    agent_id: string | null;
    created_at: string;
}

export interface CreateUserIn {
    email: string;
    name: string;
    password: string;
    role: Role;
    agent_id: string | null;
}

export type UpdateUserIn = Partial<CreateUserIn> & { is_active?: boolean };
