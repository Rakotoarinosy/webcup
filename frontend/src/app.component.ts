import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VirtualAssistantWidget } from './app/shared/virtual-assistant/virtual-assistant-widget';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, VirtualAssistantWidget],
    template: `<router-outlet></router-outlet><app-virtual-assistant-widget />`
})
export class AppComponent {}
