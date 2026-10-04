/** Données de test : uniquement importé par les specs (jamais par l'application). */
import { MunicipalService } from './municipal-content.model';

export const STATUS_DEFAULTS = {
    status: 'available',
    status_message: null,
    status_expected_back_at: null,
    status_alternative: null,
    alternative_service_id: null,
    status_updated_at: null,
    open_24_7: false,
    emergency_care: false
} as const satisfies Partial<MunicipalService>;

export function makeService(overrides: Partial<MunicipalService> & Pick<MunicipalService, 'id' | 'name'>): MunicipalService {
    return {
        category: 'Administration',
        description: 'Description',
        contact_details: 'Mairie',
        opening_hours: '8h-16h',
        icon: 'pi-building',
        display_order: 0,
        is_featured: false,
        usage_count: 0,
        address: null,
        latitude: null,
        longitude: null,
        ...STATUS_DEFAULTS,
        ...overrides
    };
}
