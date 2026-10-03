import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AppFloatingConfigurator } from '../../layout/component/floatingconfigurator/app.floatingconfigurator';

@Component({
    selector: 'app-notfound',
    imports: [RouterModule, AppFloatingConfigurator, ButtonModule],
    templateUrl: './notfound.html',
    styleUrl: './notfound.scss'
})
export class Notfound {}
