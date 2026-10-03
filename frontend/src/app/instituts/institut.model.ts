import { RequestCategory } from '@/app/requests/request.model';

/** Service qui reçoit et traite les demandes de certaines catégories (InstitutOut). */
export interface Institut {
    id: string;
    name: string;
    description: string;
    categories: RequestCategory[];
    manager_id: string | null;
    is_active: boolean;
    created_at: string;
}

export interface CreateInstitutIn {
    name: string;
    description: string;
    categories: RequestCategory[];
    manager_id: string | null;
}

export type UpdateInstitutIn = Partial<Pick<Institut, 'name' | 'description' | 'categories' | 'is_active'>>;
