/** Miroirs de GET /transport/lines (F36). */
import { LineStatus, TransportMode } from '@/app/shared/api-enums';

export type { LineStatus, TransportMode };

export interface TransportStop {
    id: string;
    name: string;
    position: number;
    minutes_from_start: number;
    latitude: number | null;
    longitude: number | null;
    /** Prochains passages théoriques (ISO), vides si la ligne est interrompue. */
    next_passages: string[];
    matches_search: boolean;
}

export interface TransportLine {
    id: string;
    code: string;
    name: string;
    mode: TransportMode;
    first_departure: string;
    last_departure: string;
    frequency_minutes: number;
    days_label: string;
    status: LineStatus;
    status_message: string | null;
    status_updated_at: string | null;
    stops: TransportStop[];
    computed_at: string;
}

export const LINE_STATUS_DISPLAY: Record<LineStatus, { label: string; icon: string; tone: 'ok' | 'warn' | 'down' }> = {
    normal: { label: 'Trafic normal', icon: 'pi-check-circle', tone: 'ok' },
    disrupted: { label: 'Trafic perturbé', icon: 'pi-exclamation-triangle', tone: 'warn' },
    interrupted: { label: 'Ligne interrompue', icon: 'pi-times-circle', tone: 'down' }
};

export const TRANSPORT_MODE_LABELS: Record<TransportMode, string> = {
    bus: 'Bus',
    minibus: 'Taxi-be',
    shuttle: 'Navette'
};

/** « dans 4 min (14:32) » : le délai d'abord, l'heure ensuite. */
export function formatPassage(iso: string, now: Date): string {
    const passage = new Date(iso);
    const minutes = Math.max(0, Math.round((passage.getTime() - now.getTime()) / 60000));
    const time = passage.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    if (minutes === 0) return `maintenant (${time})`;
    if (minutes < 60) return `dans ${minutes} min (${time})`;
    const sameDay = passage.toDateString() === now.toDateString();
    return sameDay ? `à ${time}` : `demain à ${time}`;
}
