import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./features/home/home-routing.module')
            .then(m => m.HomeRoutingModule)
    },
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth-routing.module')
            .then(m => m.AuthRoutingModule)
    },
    {
        path: 'account',
        loadChildren: () => import('./features/account/account-routing.module')
            .then(m => m.AccountRoutingModule)
    }
];
