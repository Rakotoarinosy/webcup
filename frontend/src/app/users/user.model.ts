import { Role } from '@/app/shared/api-enums';

export type { Role };

/** Miroir du schéma UserOut du backend. */
export interface User {
    id: string;
    email: string;
    name: string;
    role: Role;
    is_active: boolean;
    created_at: string;
}

export type UpdateUserIn = Partial<Pick<User, 'email' | 'name' | 'is_active'>>;

export interface CreateUserIn {
    email: string;
    name: string;
    password: string;
    role: User['role'];
}

/** PATCH /users/manage/{id} : absent = inchangé. */
export type UpdateAccountIn = Partial<Pick<User, 'email' | 'name' | 'role' | 'is_active'>> & { password?: string };
