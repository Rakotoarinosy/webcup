import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@/app/auth/auth.service';
import { TopbarWidget } from './components/topbarwidget/topbarwidget.component';

@Component({
    selector: 'app-landing',
    imports: [RouterModule, TopbarWidget],
    templateUrl: './landing.html',
    styleUrl: './landing.scss'
})
export class Landing {
    readonly auth = inject(AuthService);
}
