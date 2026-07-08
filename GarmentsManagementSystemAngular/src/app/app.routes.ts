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
  path: 'fabric-record-check',
  loadChildren: () =>
    import('./components/features/fabric-record/routes/fabric.routes')
      .then(m => m.Fabric_ROUTES)
},

{
  path: 'vendors',

  loadChildren: () =>
    import('./components/features/procurement/vendor/routes/vendor.routes')
      .then(m => m.VENDOR_ROUTES)
},

{
  path: 'store-requisitions',

  loadChildren: () =>
    import('./components/features/inventory/store-requisition/routes/store-requisition.routes')
      .then(m => m.STORE_REQUISITION_ROUTES)
},

{
  path: 'items',

  loadChildren: () =>
    import('./components/features/inventory/item/routes/item.routes')
      .then(m => m.ITEM_ROUTES)
},

{
    path: '**',
    redirectTo: 'buyers'
  },

];
