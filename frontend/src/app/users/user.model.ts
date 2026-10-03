/** Miroir des schémas du backend (backend/src/features/user/schemas.py). */

export interface User {
    id: string;
    email: string;
    name: string;
    created_at: string;
}

export interface CreateUserIn {
    email: string;
    name: string;
}

export type UpdateUserIn = Partial<CreateUserIn>;
