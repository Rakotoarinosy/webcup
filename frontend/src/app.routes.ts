import { Routes } from '@angular/router';
import { authGuard, publicSessionGuard, roleGuard } from './app/auth/auth.guard';
import { AppLayout } from './app/layout/component/layout/app.layout';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';

export const appRoutes: Routes = [
    {
        path: 'home',
        component: AppLayout,
        data: { breadcrumb: 'Espace personnel' },
        canActivateChild: [authGuard],
        children: [
            { path: 'account', data: { breadcrumb: 'Mon espace' }, loadComponent: () => import('./app/auth/account/account').then((m) => m.Account) },
            { path: 'profile', data: { breadcrumb: 'Mon profil' }, loadComponent: () => import('./app/auth/profile/profile').then((m) => m.Profile) },
            { path: 'my-data', data: { breadcrumb: 'Mes données' }, loadComponent: () => import('./app/data-privacy/my-data').then((m) => m.MyData) },
            { path: '', redirectTo: 'account', pathMatch: 'full' },
            {
                path: 'my-requests',
                canActivate: [roleGuard],
                data: { breadcrumb: 'Mes demandes', roles: ['citizen'] },
                children: [
                    { path: '', loadComponent: () => import('./app/requests/my-requests').then((m) => m.MyRequests) },
                    { path: ':id', data: { breadcrumb: 'Détail' }, loadComponent: () => import('./app/requests/my-requests').then((m) => m.MyRequests) }
                ]
            },
            { path: 'users', data: { breadcrumb: 'Comptes citoyens', roles: ['agent', 'manager', 'admin'] }, loadComponent: () => import('./app/users/users').then((m) => m.Users) },
            { path: 'requests', data: { breadcrumb: 'Demandes citoyennes', roles: ['manager', 'admin'] }, loadComponent: () => import('./app/requests/requests').then((m) => m.Requests) },
            {
                path: 'accounts',
                data: { breadcrumb: 'Utilisateurs', roles: ['admin'] },
                // Une liste par rôle : chaque entrée du menu « Utilisateurs » a sa propre route.
                children: [
                    { path: '', redirectTo: 'citizens', pathMatch: 'full' },
                    { path: 'citizens', data: { breadcrumb: 'Citoyens', role: 'citizen' }, loadComponent: () => import('./app/users/accounts').then((m) => m.Accounts) },
                    { path: 'agents', data: { breadcrumb: 'Agents', role: 'agent' }, loadComponent: () => import('./app/users/accounts').then((m) => m.Accounts) },
                    { path: 'managers', data: { breadcrumb: 'Managers', role: 'manager' }, loadComponent: () => import('./app/users/accounts').then((m) => m.Accounts) },
                    { path: 'admins', data: { breadcrumb: 'Administrateurs', role: 'admin' }, loadComponent: () => import('./app/users/accounts').then((m) => m.Accounts) }
                ]
            },
            { path: 'data-concerns', data: { breadcrumb: 'Signalements sur les données', roles: ['admin'] }, loadComponent: () => import('./app/data-privacy/data-concerns-admin').then((m) => m.DataConcernsAdmin) },
            { path: 'instituts', data: { breadcrumb: 'Instituts', roles: ['admin'] }, loadComponent: () => import('./app/instituts/instituts').then((m) => m.Instituts) },
            { path: 'journal', data: { breadcrumb: 'Journal', roles: ['agent', 'manager', 'admin'] }, loadComponent: () => import('./app/journal/journal').then((m) => m.Journal) },
            { path: 'agent', data: { breadcrumb: 'Mes interventions', roles: ['agent'] }, loadComponent: () => import('./app/agent-workspace/agent-workspace').then((m) => m.AgentWorkspace) },
            { path: 'agents', data: { breadcrumb: 'Agents', roles: ['manager', 'admin'] }, loadComponent: () => import('./app/agents/agents').then((m) => m.Agents) },
            { path: 'municipal', data: { breadcrumb: 'Accueil municipal' }, loadComponent: () => import('./app/municipal/municipal-home').then((m) => m.MunicipalHome) },
            { path: 'municipal/services', data: { breadcrumb: 'Services municipaux' }, loadComponent: () => import('./app/municipal/municipal-services').then((m) => m.MunicipalServices) },
            { path: 'municipal/publications', data: { breadcrumb: 'Publications' }, loadComponent: () => import('./app/municipal/municipal-publications').then((m) => m.MunicipalPublications) },
            { path: 'municipal/contact', data: { breadcrumb: 'Contacter la mairie' }, loadComponent: () => import('./app/municipal/municipal-contact').then((m) => m.MunicipalContact) },
            { path: 'orientation', data: { breadcrumb: 'Par où commencer ?' }, loadComponent: () => import('./app/orientation/orientation').then((m) => m.Orientation) },
            { path: 'terra-nova', data: { breadcrumb: 'API Terra Nova', roles: ['agent', 'manager', 'admin'] }, loadChildren: () => import('./app/terra-nova/terra-nova.routes') }
        ]
    },
    {
        path: 'municipal',
        canActivate: [publicSessionGuard],
        loadComponent: () => import('./app/municipal/municipal-layout').then((m) => m.MunicipalLayout),
        children: [
            { path: '', loadComponent: () => import('./app/municipal/municipal-home').then((m) => m.MunicipalHome) },
            { path: 'services', loadComponent: () => import('./app/municipal/municipal-services').then((m) => m.MunicipalServices) },
            { path: 'publications', loadComponent: () => import('./app/municipal/municipal-publications').then((m) => m.MunicipalPublications) },
            { path: 'contact', loadComponent: () => import('./app/municipal/municipal-contact').then((m) => m.MunicipalContact) },
            { path: 'orientation', loadComponent: () => import('./app/orientation/orientation').then((m) => m.Orientation) }
        ]
    },
    { path: '', component: Landing, canActivate: [publicSessionGuard] },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
