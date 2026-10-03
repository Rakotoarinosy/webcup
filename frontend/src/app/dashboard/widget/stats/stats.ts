import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

interface Stat {
    openRequests: number;
    inProgressRequests: number;
    resolvedRequests: number;
    todayInterventions: number;
}

@Component({
    selector: 'app-stats',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './stats.html',
    styleUrl: './stats.scss'
})
export class Stats {
    stats = input<Stat>({ openRequests: 0, inProgressRequests: 0, resolvedRequests: 0, todayInterventions: 0 });
}
