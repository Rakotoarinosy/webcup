import { Component, computed, inject, input } from '@angular/core';
import { ChartModule } from 'primeng/chart';

import { LayoutService } from '@/app/layout/service/layout.service';

interface TrendData {
    labels: string[];
    data: number[];
}

@Component({
    selector: 'app-trend-chart',
    imports: [ChartModule],
    templateUrl: './trend-chart.html',
    styleUrl: './trend-chart.scss'
})
export class TrendChart {
    private readonly layoutService = inject(LayoutService);

    trendData = input<TrendData>({ labels: [], data: [] });

    // Recalculé à chaque nouvelle donnée : p-chart se redessine quand la référence change.
    readonly chartData = computed(() => {
        const documentStyle = getComputedStyle(document.documentElement);

        return {
            labels: this.trendData().labels,
            datasets: [
                {
                    label: 'Nombre de demandes',
                    data: this.trendData().data,
                    fill: true,
                    borderColor: documentStyle.getPropertyValue('--primary-color') || '#3b82f6',
                    tension: 0.4,
                    backgroundColor: 'rgba(59, 130, 246, 0.1)'
                }
            ]
        };
    });

    // Couleurs d'axes adaptées au thème : recalculées à chaque bascule clair / sombre.
    readonly chartOptions = computed(() => {
        const dark = this.layoutService.isDarkTheme();
        const tickColor = dark ? '#a1a1aa' : '#64748b';
        const gridColor = dark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0';

        return {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    ticks: { color: tickColor },
                    grid: { color: gridColor, drawBorder: false }
                },
                y: {
                    ticks: { color: tickColor, precision: 0 },
                    grid: { color: gridColor, drawBorder: false },
                    beginAtZero: true
                }
            }
        };
    });
}
