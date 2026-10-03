export interface MunicipalService {
    id: string;
    name: string;
    category: string;
    description: string;
    contact_details: string;
    opening_hours: string;
    icon: string;
    display_order: number;
    is_featured: boolean;
    usage_count: number;
}

export interface MunicipalPublication {
    id: string;
    title: string;
    summary: string;
    content: string;
    category: string;
    published_at: string;
}

export interface ContactMessageIn {
    service_id?: string | null;
    sender_name: string;
    sender_email: string;
    subject: string;
    message: string;
}

export interface ContactReceipt {
    receipt_number: string;
    created_at: string;
    message: string;
}
