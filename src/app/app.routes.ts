import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'verified',
    loadComponent: () => import('./pages/verified/verified.page').then( m => m.VerifiedPage)
  },
  {
    path: 'parking',
    loadComponent: () => import('./pages/parking/parking.page').then( m => m.ParkingPage)
  },
  {
    path: 'transactions-details',
    loadComponent: () => import('./pages/transactions-details/transactions-details.page').then( m => m.TransactionsDetailsPage)
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  }
];
