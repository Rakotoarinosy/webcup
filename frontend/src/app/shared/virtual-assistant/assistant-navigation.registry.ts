import { Role } from '@/app/auth/auth.model';

/** Source unique des destinations réellement présentes dans les routes Angular. */
export type AssistantNavigationIntent = 'services' | 'publications' | 'contact' | 'account' | 'my_requests' | 'requests' | 'journal';

interface AssistantDestination { label: string; path: string; homePath?: string; roles?: Role[]; }

const DESTINATIONS: Record<AssistantNavigationIntent, AssistantDestination> = {
    services: { label: 'Voir les services municipaux', path: '/municipal/services', homePath: '/home/municipal/services' },
    publications: { label: 'Voir les publications', path: '/municipal/publications', homePath: '/home/municipal/publications' },
    contact: { label: 'Contacter la mairie', path: '/municipal/contact', homePath: '/home/municipal/contact' },
    account: { label: 'Mon espace', path: '/home/account' },
    my_requests: { label: 'Voir mes demandes', path: '/home/my-requests', roles: ['citizen'] },
    requests: { label: 'Demandes citoyennes', path: '/home/requests', roles: ['manager', 'admin'] },
    journal: { label: 'Ouvrir le journal', path: '/home/journal', roles: ['agent', 'manager', 'admin'] }
};

export function assistantDestination(intent: string | null | undefined, role: Role | undefined, currentUrl = ''): AssistantDestination | null {
    if (!intent || !(intent in DESTINATIONS)) return null;
    const destination = DESTINATIONS[intent as AssistantNavigationIntent];
    if (destination.roles && (role === undefined || !destination.roles.includes(role))) return null;
    return currentUrl.startsWith('/home') && destination.homePath
        ? { ...destination, path: destination.homePath }
        : destination;
}
