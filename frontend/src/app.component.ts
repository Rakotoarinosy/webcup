import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SelectionExplainer } from './app/shared/plain-language/selection-explainer';
import { VirtualAssistantWidget } from './app/shared/virtual-assistant/virtual-assistant-widget';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, VirtualAssistantWidget, SelectionExplainer],
    template: `<router-outlet></router-outlet><app-virtual-assistant-widget /><app-selection-explainer />`
})
export class AppComponent {}
