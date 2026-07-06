import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'buyers',
    pathMatch: 'full'
  },

    {
    path: 'buyers',

    loadChildren: () =>
      import('./components/features/buyer/routes/buyer.routes')
        .then(m => m.BUYER_ROUTES)
  },


  // ==========================
  // UOM
  // ==========================

  {
    path: 'uoms',
    loadChildren: () =>
      import('./components/features/uom/routes/uom.routes')
        .then(m => m.UOM_ROUTES)
  },

  

  // Style Routes

  {
  path: 'styles',

  loadChildren: () =>
    import('./components/features/style/routes/style.routes')
      .then(m => m.STYLE_ROUTES)
},

{
  path: 'bom',

  loadChildren: () =>
    import('./components/features/bom/routes/bom.routes')
      .then(m => m.BOM_ROUTES)
},



{
  path: 'orders',

  loadChildren: () =>
    import('./components/features/order/routes/order.routes')
      .then(m => m.ORDER_ROUTES)
},

{
  path: 'raw-material-check',
  loadChildren: () =>
    import('./components/features/raw-material-check/routes/rmc.routes')
      .then(m => m.RMC_ROUTES)
},

{
    path: '**',
    redirectTo: 'buyers'
  },

];
