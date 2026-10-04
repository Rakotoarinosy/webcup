import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SelectionExplainer } from './app/shared/plain-language/selection-explainer';
import { VirtualAssistantWidget } from './app/shared/virtual-assistant/virtual-assistant-widget';
import { CursorParticles } from './app/shared/cursor-particles/cursor-particles';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, VirtualAssistantWidget, SelectionExplainer, CursorParticles],
    template: `<router-outlet></router-outlet><app-cursor-particles /><app-virtual-assistant-widget /><app-selection-explainer />`
})
export class AppComponent {}
