import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { SplitButtonModule } from 'primeng/splitbutton';

const LOADING_DURATION_MS = 1000;

@Component({
    selector: 'app-button-demo',
    imports: [ButtonModule, ButtonGroupModule, SplitButtonModule],
    templateUrl: './buttondemo.html',
    styleUrl: './buttondemo.scss'
})
export class ButtonDemo {
    // Split button menu entries.
    readonly items: MenuItem[] = [
        { label: 'Update', icon: 'pi pi-refresh' },
        { label: 'Delete', icon: 'pi pi-times' },
        { label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io' },
        { separator: true },
        { label: 'Setup', icon: 'pi pi-cog' }
    ];

    // Loading state of each button in the "Loading" section, by index.
    readonly loading = [false, false, false, false];

    load(index: number) {
        this.loading[index] = true;
        setTimeout(() => (this.loading[index] = false), LOADING_DURATION_MS);
    }
}
