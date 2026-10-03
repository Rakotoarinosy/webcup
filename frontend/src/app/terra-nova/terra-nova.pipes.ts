import { Pipe, PipeTransform } from '@angular/core';

const numberFormat = new Intl.NumberFormat('fr-FR');

/** 8450 → « 8 450 XP » */
@Pipe({ name: 'xp' })
export class XpPipe implements PipeTransform {
    transform(value: number | null | undefined, sign = false): string {
        const v = value ?? 0;
        return `${sign && v > 0 ? '+' : ''}${numberFormat.format(v)} XP`;
    }
}

/** arrival_time est un délai depuis le début du concours, pas une heure : « 02:00:00 » → « H+2 ». */
@Pipe({ name: 'arrival' })
export class ArrivalPipe implements PipeTransform {
    transform(value: string | null | undefined): string {
        if (!value) return 'Lancement';
        const [h = '0', m = '0'] = value.split(':');
        const minutes = parseInt(m, 10) || 0;
        return `H+${parseInt(h, 10) || 0}${minutes ? 'h' + String(minutes).padStart(2, '0') : ''}`;
    }
}

/** Temps relatif. `now` est passé en argument pour garder un pipe pur réévalué à chaque seconde. */
@Pipe({ name: 'ago' })
export class AgoPipe implements PipeTransform {
    transform(value: string | null | undefined, now: number): string {
        if (!value) return 'jamais';
        const seconds = Math.max(0, Math.round((now - new Date(value).getTime()) / 1000));
        if (seconds < 5) return "à l'instant";
        if (seconds < 60) return `il y a ${seconds} s`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `il y a ${minutes} min`;
        const hours = Math.floor(minutes / 60);
        return hours < 24 ? `il y a ${hours} h ${String(minutes % 60).padStart(2, '0')}` : `il y a ${Math.floor(hours / 24)} j`;
    }
}

/** Millisecondes → « HH:MM:SS » */
@Pipe({ name: 'countdown' })
export class CountdownPipe implements PipeTransform {
    transform(ms: number | null | undefined): string {
        const total = Math.max(0, Math.floor((ms ?? 0) / 1000));
        return [Math.floor(total / 3600), Math.floor((total % 3600) / 60), total % 60].map((n) => String(n).padStart(2, '0')).join(':');
    }
}
