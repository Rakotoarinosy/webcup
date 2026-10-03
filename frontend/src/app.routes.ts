import { Routes } from '@angular/router';
import { authGuard, roleGuard } from './app/auth/auth.guard';
import { AppLayout } from './app/layout/component/layout/app.layout';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { Dashboard } from './app/dashboard/dashboard';

export const appRoutes: Routes = [
    {
        path: 'home',
        component: AppLayout,
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: Dashboard, canActivate: [roleGuard], data: { roles: ['admin', 'manager'] } },
            { path: 'users', canActivate: [roleGuard], data: { roles: ['admin'] }, loadComponent: () => import('./app/users/users').then((m) => m.Users) },
            { path: 'requests', loadComponent: () => import('./app/requests/requests').then((m) => m.Requests), canActivate: [roleGuard], data: { roles: ['admin', 'manager', 'agent', 'citizen'] } },
            { path: 'agent', canActivate: [roleGuard], data: { roles: ['agent'] }, loadComponent: () => import('./app/agent-workspace/agent-workspace').then((m) => m.AgentWorkspace) },
            { path: 'agents', canActivate: [roleGuard], data: { roles: ['manager', 'admin'] }, loadComponent: () => import('./app/agents/agents').then((m) => m.Agents) },
            { path: 'municipal', loadComponent: () => import('./app/municipal/municipal-home').then((m) => m.MunicipalHome), canActivate: [roleGuard], data: { roles: ['admin', 'manager', 'agent', 'citizen'] } },
            { path: 'municipal/services', loadComponent: () => import('./app/municipal/municipal-services').then((m) => m.MunicipalServices), canActivate: [roleGuard], data: { roles: ['admin', 'manager', 'agent', 'citizen'] } },
            { path: 'municipal/publications', loadComponent: () => import('./app/municipal/municipal-publications').then((m) => m.MunicipalPublications), canActivate: [roleGuard], data: { roles: ['admin', 'manager', 'agent', 'citizen'] } },
            { path: 'municipal/contact', loadComponent: () => import('./app/municipal/municipal-contact').then((m) => m.MunicipalContact), canActivate: [roleGuard], data: { roles: ['admin', 'manager', 'agent', 'citizen'] } },
            {
                path: 'terra-nova',
                loadChildren: () => import('./app/terra-nova/terra-nova.routes'),
                canActivate: [roleGuard],
                data: { roles: ['admin', 'manager', 'agent'] }
            },
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
