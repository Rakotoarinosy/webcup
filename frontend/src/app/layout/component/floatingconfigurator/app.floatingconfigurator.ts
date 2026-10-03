import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, input, signal, viewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';

import { AppConfigurator } from '../configurator/app.configurator';

@Component({
    selector: 'app-floating-configurator',
    imports: [CommonModule, ButtonModule, StyleClassModule, AppConfigurator],
    templateUrl: './app.floatingconfigurator.html',
    styleUrl: './app.floatingconfigurator.scss'
})
export class AppFloatingConfigurator {
    float = input<boolean>(true);
    readonly visible = signal(false);
    readonly configMenu = viewChild<ElementRef<HTMLElement>>('configMenu');

    toggle(event: MouseEvent): void {
        event.stopPropagation();
        this.visible.update((visible) => !visible);
    }

    @HostListener('document:click', ['$event'])
    closeOnOutsideClick(event: MouseEvent): void {
        if (this.visible() && !this.configMenu()?.nativeElement.contains(event.target as Node)) this.visible.set(false);
    }

    @HostListener('document:keydown.escape')
    closeOnEscape(): void {
        this.visible.set(false);
    }
}
