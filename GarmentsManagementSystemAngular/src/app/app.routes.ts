import { Routes } from '@angular/router';

export const routes: Routes = [

    {
    path: 'buyers',

    loadChildren: () =>
      import('./components/features/buyer/routes/buyer.routes')
        .then(m => m.BUYER_ROUTES)
  }
];
