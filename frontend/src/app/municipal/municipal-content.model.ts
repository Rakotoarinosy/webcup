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
    /** Accueil physique (F45) : null tant que la mairie ne l'a pas renseigné. */
    address: string | null;
    latitude: number | null;
    longitude: number | null;
}

export interface ServiceLocationIn {
    address: string | null;
    latitude: number | null;
    longitude: number | null;
}

export type LocatedService = MunicipalService & { latitude: number; longitude: number };

export function isLocated(service: MunicipalService): service is LocatedService {
    return service.latitude !== null && service.longitude !== null;
}

/** Itinéraire vers le service, ouvert dans l'application de cartes du téléphone ou du navigateur. */
export function directionsUrl(service: LocatedService): string {
    return `https://www.google.com/maps/dir/?api=1&destination=${service.latitude},${service.longitude}`;
}

/** Distance à vol d'oiseau en kilomètres (formule de haversine). */
export function distanceKm(from: { latitude: number; longitude: number }, to: { latitude: number; longitude: number }): number {
    const rad = (deg: number) => (deg * Math.PI) / 180;
    const dLat = rad(to.latitude - from.latitude);
    const dLon = rad(to.longitude - from.longitude);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(from.latitude)) * Math.cos(rad(to.latitude)) * Math.sin(dLon / 2) ** 2;
    return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function formatDistance(km: number): string {
    return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toLocaleString('fr-FR', { maximumFractionDigits: 1 })} km`;
}

export interface MunicipalPublication {
    id: string;
    title: string;
    summary: string;
    content: string;
    category: string;
    published_at: string;
    /** Présent pour les équipes de la mairie ; les citoyens ne reçoivent que les publications visibles. */
    is_published?: boolean;
    image_url?: string | null;
    view_count?: number;
    like_count?: number;
}

export interface MunicipalPublicationIn {
    title: string;
    summary: string;
    content: string;
    category: string;
    published_at: string;
    is_published: boolean;
    image_url: string | null;
}

export interface PublicationLikeResult {
    like_count: number;
    liked: boolean;
}

export interface MunicipalPublicationComment {
    id: string;
    publication_id: string;
    author_name: string;
    content: string;
    created_at: string;
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
