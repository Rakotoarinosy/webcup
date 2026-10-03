import { Component, effect, inject, signal } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { FluidModule } from 'primeng/fluid';
import { LayoutService } from '@/app/layout/service/layout.service';

const MONTH_LABELS = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

/** Theme colors read from CSS custom properties, shared by every chart. */
interface ChartTheme {
    documentStyle: CSSStyleDeclaration;
    textColor: string;
    textColorSecondary: string;
    surfaceBorder: string;
}

@Component({
    selector: 'app-chart-demo',
    imports: [ChartModule, FluidModule],
    templateUrl: './chartdemo.html',
    styleUrl: './chartdemo.scss'
})
export class ChartDemo {
    readonly layoutService = inject(LayoutService);

    readonly lineData = signal<any>(null);
    readonly barData = signal<any>(null);
    readonly pieData = signal<any>(null);
    readonly polarData = signal<any>(null);
    readonly radarData = signal<any>(null);

    readonly lineOptions = signal<any>(null);
    readonly barOptions = signal<any>(null);
    readonly pieOptions = signal<any>(null);
    readonly polarOptions = signal<any>(null);
    readonly radarOptions = signal<any>(null);

    // Rebuild charts whenever the dark theme toggles; the delay lets the new CSS variables apply first.
    readonly chartEffect = effect(() => {
        this.layoutService.layoutConfig().darkTheme;
        setTimeout(() => this.initCharts(), 150);
    });

    initCharts() {
        const theme = this.readTheme();

        this.initBarChart(theme);
        this.initPieChart(theme);
        this.initLineChart(theme);
        this.initPolarChart(theme);
        this.initRadarChart(theme);
    }

    private readTheme(): ChartTheme {
        const documentStyle = getComputedStyle(document.documentElement);

        return {
            documentStyle,
            textColor: documentStyle.getPropertyValue('--text-color'),
            textColorSecondary: documentStyle.getPropertyValue('--text-color-secondary'),
            surfaceBorder: documentStyle.getPropertyValue('--surface-border')
        };
    }

    private initBarChart({ documentStyle, textColor, textColorSecondary, surfaceBorder }: ChartTheme) {
        this.barData.set({
            labels: MONTH_LABELS,
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: documentStyle.getPropertyValue('--p-primary-500'),
                    borderColor: documentStyle.getPropertyValue('--p-primary-500'),
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    backgroundColor: documentStyle.getPropertyValue('--p-primary-200'),
                    borderColor: documentStyle.getPropertyValue('--p-primary-200'),
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        });

        this.barOptions.set({
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        });
    }

    private initPieChart({ documentStyle, textColor }: ChartTheme) {
        this.pieData.set({
            labels: ['A', 'B', 'C'],
            datasets: [
                {
                    data: [540, 325, 702],
                    backgroundColor: [documentStyle.getPropertyValue('--p-indigo-500'), documentStyle.getPropertyValue('--p-purple-500'), documentStyle.getPropertyValue('--p-teal-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--p-indigo-400'), documentStyle.getPropertyValue('--p-purple-400'), documentStyle.getPropertyValue('--p-teal-400')]
                }
            ]
        });

        this.pieOptions.set({
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        });
    }

    private initLineChart({ documentStyle, textColor, textColorSecondary, surfaceBorder }: ChartTheme) {
        this.lineData.set({
            labels: MONTH_LABELS,
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--p-primary-500'),
                    borderColor: documentStyle.getPropertyValue('--p-primary-500'),
                    tension: 0.4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--p-primary-200'),
                    borderColor: documentStyle.getPropertyValue('--p-primary-200'),
                    tension: 0.4
                }
            ]
        });

        this.lineOptions.set({
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        });
    }

    private initPolarChart({ documentStyle, textColor, textColorSecondary, surfaceBorder }: ChartTheme) {
        this.polarData.set({
            datasets: [
                {
                    data: [11, 16, 7, 3],
                    backgroundColor: [documentStyle.getPropertyValue('--p-indigo-500'), documentStyle.getPropertyValue('--p-purple-500'), documentStyle.getPropertyValue('--p-teal-500'), documentStyle.getPropertyValue('--p-orange-500')],
                    label: 'My dataset'
                }
            ],
            labels: ['Indigo', 'Purple', 'Teal', 'Orange']
        });

        this.polarOptions.set({
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                r: {
                    grid: {
                        color: surfaceBorder
                    },
                    ticks: {
                        display: false,
                        color: textColorSecondary
                    }
                }
            }
        });
    }

    private initRadarChart({ documentStyle, textColor, surfaceBorder }: ChartTheme) {
        this.radarData.set({
            labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
            datasets: [
                {
                    label: 'My First dataset',
                    borderColor: documentStyle.getPropertyValue('--p-indigo-400'),
                    pointBackgroundColor: documentStyle.getPropertyValue('--p-indigo-400'),
                    pointBorderColor: documentStyle.getPropertyValue('--p-indigo-400'),
                    pointHoverBackgroundColor: textColor,
                    pointHoverBorderColor: documentStyle.getPropertyValue('--p-indigo-400'),
                    data: [65, 59, 90, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    borderColor: documentStyle.getPropertyValue('--p-purple-400'),
                    pointBackgroundColor: documentStyle.getPropertyValue('--p-purple-400'),
                    pointBorderColor: documentStyle.getPropertyValue('--p-purple-400'),
                    pointHoverBackgroundColor: textColor,
                    pointHoverBorderColor: documentStyle.getPropertyValue('--p-purple-400'),
                    data: [28, 48, 40, 19, 96, 27, 100]
                }
            ]
        });

        this.radarOptions.set({
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                r: {
                    pointLabels: {
                        color: textColor
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        });
    }
}
