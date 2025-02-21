import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth-routing.module')
        .then(m => m.AuthRoutingModule)
    },
    {
        path: 'home',
        loadChildren: () => import('./features/home/home-routing.module')
        .then(m => m.HomeRoutingModule)
    }
];
