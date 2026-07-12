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
  path: 'pending-store-requisition',

  loadChildren: () =>
    import('./components/features/procurement/pending-store-requisition/routes/pending-store-requisition.routes')
      .then(m => m.PENDING_STORE_REQUISITION_ROUTES)
},

{
  path: 'purchase-orders',

  loadChildren: () =>
    import('./components/features/procurement/purchase-order/routes/purchase-order.routes')
      .then(m => m.PURCHASE_ORDER_ROUTES)
},

{
  path: 'items',

  loadChildren: () =>
    import('./components/features/inventory/item/routes/item.routes')
      .then(m => m.ITEM_ROUTES)
},

{
  path: 'inventory/grn',
  loadChildren: () =>
    import('./components/features/inventory/grn/routes/grn.routes')
      .then(m => m.GOODS_RECEIVE_NOTE_ROUTES)
},

{
  path: 'stocks',
  loadChildren: () =>
    import('./components/features/inventory/stock/routes/stock.routes')
      .then(m => m.STOCK_ROUTES)
},

{
  path: 'material-issue',
  loadChildren: () =>
    import('./components/features/inventory/material-issue/routes/material-issue.routes')
      .then(m => m.MATERIAL_ISSUE_ROUTES)
},

{
  path: 'production-lines',
  loadChildren: () =>
    import('./components/features/production/production-line/routes/production-line.routes')
      .then(m => m.PRODUCTION_LINE_ROUTES)
},

{
  path: 'machines',
  loadChildren: () =>
    import('./components/features/production/machine/routes/machine.routes')
      .then(m => m.MACHINE_ROUTES)
},

{
  path: 'cutting-plan',
  loadChildren: () =>
    import('./components/features/production/cutting-plan/routes/cutting-plan.routes')
      .then(m => m.CUTTING_PLAN_ROUTES)
},

{
  path: 'cutting-production',

  loadChildren: () =>
    import('./components/features/production/day-wise-cutting-production/routes/day-wise-cutting-production.routes')
      .then(m => m.DAY_WISE_CUTTING_PRODUCTION_ROUTES)
},

{
  path: 'sewing-plan',

  loadChildren: () =>
    import('./components/features/production/sewing-plan/routes/sewing-plan.routes')
      .then(m => m.SEWING_PLAN_ROUTES)
},

{
    path: '**',
    redirectTo: 'buyers'
  },

];
