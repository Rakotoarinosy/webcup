import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { AuthService } from '@/app/auth/auth.service';
import { TranslatePipe } from '@/app/i18n/t.pipe';
import { AppFloatingConfigurator } from '@/app/layout/component/floatingconfigurator/app.floatingconfigurator';

@Component({
    selector: 'topbar-widget',
    imports: [RouterModule, StyleClassModule, ButtonModule, RippleModule, AppFloatingConfigurator, TranslatePipe],
    templateUrl: './topbarwidget.component.html',
    styleUrl: './topbarwidget.component.scss'
})
export class TopbarWidget {
    readonly router = inject(Router);
    readonly auth = inject(AuthService);

    readonly navItems: readonly { label: string; fragment: string }[] = [
        { label: 'landing.nav.solution', fragment: 'solution' },
        { label: 'landing.nav.process', fragment: 'process' },
        { label: 'landing.nav.security', fragment: 'securite' }
    ];
}
