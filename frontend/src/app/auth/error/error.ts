import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AppFloatingConfigurator } from '../../layout/component/floatingconfigurator/app.floatingconfigurator';

@Component({
    selector: 'app-error',
    imports: [ButtonModule, RouterModule, AppFloatingConfigurator],
    templateUrl: './error.html',
    styleUrl: './error.scss'
})
export class Error {}
