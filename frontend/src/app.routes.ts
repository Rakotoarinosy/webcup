import { Routes } from '@angular/router';
import { authGuard } from './app/auth/auth.guard';
import { AppLayout } from './app/layout/component/layout/app.layout';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { Dashboard } from './app/dashboard/dashboard';
import { Transaction } from './app/transaction/transaction';

export const appRoutes: Routes = [
    {
        path: 'home',
        component: AppLayout,
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: Dashboard },
            { path: 'transaction', component: Transaction },
            { path: 'users', loadComponent: () => import('./app/users/users').then((m) => m.Users) },
            { path: 'requests', loadComponent: () => import('./app/requests/requests').then((m) => m.Requests) },
            { path: 'agents', loadComponent: () => import('./app/agents/agents').then((m) => m.Agents) },
            { path: 'terra-nova', loadChildren: () => import('./app/terra-nova/terra-nova.routes') },
            // Démos du template (composants PrimeNG, pages CRUD / vide / documentation).
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    { path: '', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
