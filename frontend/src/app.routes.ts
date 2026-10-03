import { Routes } from '@angular/router';
import { authGuard, publicSessionGuard } from './app/auth/auth.guard';
import { AppLayout } from './app/layout/component/layout/app.layout';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { Dashboard } from './app/dashboard/dashboard';

export const appRoutes: Routes = [
    {
        path: 'home',
        component: AppLayout,
        canActivateChild: [authGuard],
        children: [
            { path: 'account', loadComponent: () => import('./app/auth/account/account').then((m) => m.Account) },
            { path: '', redirectTo: 'account', pathMatch: 'full' },
            { path: 'dashboard', data: { roles: ['manager', 'admin'] }, component: Dashboard },
            { path: 'users', data: { roles: ['admin'] }, loadComponent: () => import('./app/users/users').then((m) => m.Users) },
            { path: 'requests', data: { roles: ['admin'] }, loadComponent: () => import('./app/requests/requests').then((m) => m.Requests) },
            { path: 'agent', data: { roles: ['agent'] }, loadComponent: () => import('./app/agent-workspace/agent-workspace').then((m) => m.AgentWorkspace) },
            { path: 'agents', data: { roles: ['manager', 'admin'] }, loadComponent: () => import('./app/agents/agents').then((m) => m.Agents) },
            { path: 'terra-nova', data: { roles: ['agent', 'manager', 'admin'] }, loadChildren: () => import('./app/terra-nova/terra-nova.routes') }
        ]
    },
    { path: '', component: Landing, canActivate: [publicSessionGuard] },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];