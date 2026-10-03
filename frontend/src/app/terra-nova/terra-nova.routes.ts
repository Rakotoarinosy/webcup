import { Routes } from '@angular/router';
import { TerraNova } from './terra-nova';

export default [
    {
        path: '',
        component: TerraNova,
        children: [
            { path: '', data: { breadcrumb: 'Tableau de bord' }, loadComponent: () => import('./dashboard/tn-dashboard').then((m) => m.TerraNovaDashboard) },
            { path: 'demandes', data: { breadcrumb: 'Demandes API' }, loadComponent: () => import('./requests/tn-requests').then((m) => m.TerraNovaRequests) },
            { path: 'notifications', data: { breadcrumb: 'Notifications' }, loadComponent: () => import('./notifications/tn-notifications').then((m) => m.TerraNovaNotifications) },
            { path: 'pipeline', data: { breadcrumb: 'Pipeline' }, loadComponent: () => import('./pipeline/tn-pipeline').then((m) => m.TerraNovaPipeline) }
        ]
    }
] satisfies Routes;
