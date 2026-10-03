import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AppFloatingConfigurator } from '../../layout/component/floatingconfigurator/app.floatingconfigurator';

@Component({
    selector: 'app-access',
    imports: [ButtonModule, RouterModule, AppFloatingConfigurator],
    templateUrl: './access.html',
    styleUrl: './access.scss'
})
export class Access {}
