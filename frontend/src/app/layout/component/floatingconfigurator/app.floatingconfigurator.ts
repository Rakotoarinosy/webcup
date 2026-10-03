import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';

import { AppConfigurator } from '../configurator/app.configurator';
import { AppThemeSwitcher } from '../themeswitcher/app.themeswitcher';

@Component({
    selector: 'app-floating-configurator',
    imports: [CommonModule, ButtonModule, StyleClassModule, AppConfigurator, AppThemeSwitcher],
    templateUrl: './app.floatingconfigurator.html',
    styleUrl: './app.floatingconfigurator.scss'
})
export class AppFloatingConfigurator {
    float = input<boolean>(true);
}
