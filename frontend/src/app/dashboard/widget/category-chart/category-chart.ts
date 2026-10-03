import { Component, computed, inject, input } from '@angular/core';
import { ChartModule } from 'primeng/chart';

import { LayoutService } from '@/app/layout/service/layout.service';

interface CategoryData {
    labels: string[];
    data: number[];
}

// Une couleur par catégorie de demande (7 catégories côté API).
const COLORS = ['blue', 'orange', 'green', 'purple', 'red', 'teal', 'gray'];
const FALLBACK: Record<string, [string, string]> = {
    blue: ['#3b82f6', '#60a5fa'],
    orange: ['#f97316', '#fb923c'],
    green: ['#22c55e', '#4ade80'],
    purple: ['#a855f7', '#c084fc'],
    red: ['#ef4444', '#f87171'],
    teal: ['#14b8a6', '#2dd4bf'],
    gray: ['#6b7280', '#9ca3af']
};

@Component({
    selector: 'app-category-chart',
    imports: [ChartModule],
    templateUrl: './category-chart.html',
    styleUrl: './category-chart.scss'
})
export class CategoryChart {
    private readonly layoutService = inject(LayoutService);

    categoryData = input<CategoryData>({ labels: [], data: [] });

    readonly chartData = computed(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const color = (name: string, shade: 0 | 1) => documentStyle.getPropertyValue(`--${name}-${shade === 0 ? 500 : 400}`) || FALLBACK[name][shade];

        return {
            labels: this.categoryData().labels,
            datasets: [
                {
                    data: this.categoryData().data,
                    backgroundColor: COLORS.map((name) => color(name, 0)),
                    hoverBackgroundColor: COLORS.map((name) => color(name, 1))
                }
            ]
        };
    });

    // Couleur de légende adaptée au thème : recalculée à chaque bascule clair / sombre.
    readonly chartOptions = computed(() => ({
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: this.layoutService.isDarkTheme() ? '#e4e4e7' : '#334155'
                }
            }
        },
        cutout: '60%' // Donne un style Donut moderne
    }));
}
