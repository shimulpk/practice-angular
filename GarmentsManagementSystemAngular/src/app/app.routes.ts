import { Routes } from '@angular/router';
import { RoleRedirect } from './components/features/auth/pages/role-redirect/role-redirect';
import { authGuard, roleGuard } from './guards/auth-guard';
import { Login } from './components/features/auth/pages/login/login';
import { Dashboard } from './components/features/dashboard/pages/dashboard/dashboard';
import { Layout } from './components/shared/layout/layout/layout';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // ==========================
  // Public Routes
  // ==========================

  {
    path: 'login',
    component: Login
  },

  // forgot-password, reset-password থাকলে এখানেই থাকবে

  // ==========================
  // Protected Routes
  // ==========================

  {
    path: '',
    component: Layout,
    canActivate: [authGuard],

    children: [

      {
        path: 'dashboard',
        component: Dashboard,
         canActivate: [roleGuard]
      },

      {
        path: 'users',
         canActivate: [roleGuard],
  data: { module: 'USER' },
        loadChildren: () =>
          import('./components/features/user/routes/user.routes')
            .then(m => m.USER_ROUTES)
      },

      {
        path: 'buyers',
         canActivate: [roleGuard],
  data: { module: 'MERCHANDISING' },
        loadChildren: () =>
          import('./components/features/buyer/routes/buyer.routes')
            .then(m => m.BUYER_ROUTES)
      },

      {
        path: 'uoms',
         canActivate: [roleGuard],
  data: { module: 'MERCHANDISING' },
        loadChildren: () =>
          import('./components/features/uom/routes/uom.routes')
            .then(m => m.UOM_ROUTES)
      },

      {
        path: 'styles',
         canActivate: [roleGuard],
  data: { module: 'MERCHANDISING' },
        loadChildren: () =>
          import('./components/features/style/routes/style.routes')
            .then(m => m.STYLE_ROUTES)
      },

      {
        path: 'bom',
         canActivate: [roleGuard],
  data: { module: 'MERCHANDISING' },
        loadChildren: () =>
          import('./components/features/bom/routes/bom.routes')
            .then(m => m.BOM_ROUTES)
      },

      {
        path: 'orders',
         canActivate: [roleGuard],
  data: { module: 'MERCHANDISING' },
        loadChildren: () =>
          import('./components/features/order/routes/order.routes')
            .then(m => m.ORDER_ROUTES)
      },

      {
        path: 'raw-material-check',
         canActivate: [roleGuard],
  data: { module: 'MERCHANDISING' },
        loadChildren: () =>
          import('./components/features/raw-material-check/routes/rmc.routes')
            .then(m => m.RMC_ROUTES)
      },

      {
        path: 'fabric-record-check',
         canActivate: [roleGuard],
  data: { module: 'MERCHANDISING' },
        loadChildren: () =>
          import('./components/features/fabric-record/routes/fabric.routes')
            .then(m => m.Fabric_ROUTES)
      },

      {
        path: 'vendors',
         canActivate: [roleGuard],
  data: { module: 'PROCUREMENT' },
        loadChildren: () =>
          import('./components/features/procurement/vendor/routes/vendor.routes')
            .then(m => m.VENDOR_ROUTES)
      },

      {
        path: 'store-requisitions',
         canActivate: [roleGuard],
  data: { module: 'INVENTORY' },
        loadChildren: () =>
          import('./components/features/inventory/store-requisition/routes/store-requisition.routes')
            .then(m => m.STORE_REQUISITION_ROUTES)
      },

      {
        path: 'pending-store-requisition',
         canActivate: [roleGuard],
  data: { module: 'PROCUREMENT' },
        loadChildren: () =>
          import('./components/features/procurement/pending-store-requisition/routes/pending-store-requisition.routes')
            .then(m => m.PENDING_STORE_REQUISITION_ROUTES)
      },

      {
        path: 'purchase-orders',
         canActivate: [roleGuard],
  data: { module: 'PROCUREMENT' },
        loadChildren: () =>
          import('./components/features/procurement/purchase-order/routes/purchase-order.routes')
            .then(m => m.PURCHASE_ORDER_ROUTES)
      },

      {
        path: 'items',
         canActivate: [roleGuard],
  data: { module: 'INVENTORY' },
        loadChildren: () =>
          import('./components/features/inventory/item/routes/item.routes')
            .then(m => m.ITEM_ROUTES)
      },

      {
        path: 'inventory/grn',
         canActivate: [roleGuard],
  data: { module: 'INVENTORY' },
        loadChildren: () =>
          import('./components/features/inventory/grn/routes/grn.routes')
            .then(m => m.GOODS_RECEIVE_NOTE_ROUTES)
      },

      {
        path: 'stocks',
         canActivate: [roleGuard],
  data: { module: 'INVENTORY' },
        loadChildren: () =>
          import('./components/features/inventory/stock/routes/stock.routes')
            .then(m => m.STOCK_ROUTES)
      },

      {
        path: 'material-issue',
         canActivate: [roleGuard],
  data: { module: 'INVENTORY' },
        loadChildren: () =>
          import('./components/features/inventory/material-issue/routes/material-issue.routes')
            .then(m => m.MATERIAL_ISSUE_ROUTES)
      },

      {
        path: 'production-lines',
         canActivate: [roleGuard],
  data: { module: 'PRODUCTION' },
        loadChildren: () =>
          import('./components/features/production/production-line/routes/production-line.routes')
            .then(m => m.PRODUCTION_LINE_ROUTES)
      },

      {
        path: 'machines',
         canActivate: [roleGuard],
  data: { module: 'PRODUCTION' },
        loadChildren: () =>
          import('./components/features/production/machine/routes/machine.routes')
            .then(m => m.MACHINE_ROUTES)
      },

      {
        path: 'cutting-plan',
         canActivate: [roleGuard],
  data: { module: 'CUTTING' },
        loadChildren: () =>
          import('./components/features/production/cutting-plan/routes/cutting-plan.routes')
            .then(m => m.CUTTING_PLAN_ROUTES)
      },

      {
        path: 'cutting-production',
         canActivate: [roleGuard],
  data: { module: 'CUTTING' },
        loadChildren: () =>
          import('./components/features/production/day-wise-cutting-production/routes/day-wise-cutting-production.routes')
            .then(m => m.DAY_WISE_CUTTING_PRODUCTION_ROUTES)
      },

      {
        path: 'sewing-plan',
         canActivate: [roleGuard],
  data: { module: 'SEWING' },
        loadChildren: () =>
          import('./components/features/production/sewing-plan/routes/sewing-plan.routes')
            .then(m => m.SEWING_PLAN_ROUTES)
      },

      {
        path: 'sewing-production',
         canActivate: [roleGuard],
  data: { module: 'SEWING' },
        loadChildren: () =>
          import('./components/features/production/day-wise-sewing-production/routes/day-wise-sewing-production.routes')
            .then(m => m.DAY_WISE_SEWING_PRODUCTION_ROUTES)
      },

      {
        path: 'finishing-plan',
         canActivate: [roleGuard],
  data: { module: 'FINISHING' },
        loadChildren: () =>
          import('./components/features/production/finishing-plan/routes/finishing-plan.routes')
            .then(m => m.FINISHING_PLAN_ROUTES)
      },

      {
        path: 'day-wise-finishing-production',
         canActivate: [roleGuard],
  data: { module: 'FINISHING' },
        loadChildren: () =>
          import('./components/features/production/day-wise-finishing-production/routes/day-wise-finishing-production.routes')
            .then(m => m.DAY_WISE_FINISHING_PRODUCTION_ROUTES)
      },

      {
        path: 'packing-plans',
        canActivate: [roleGuard],
  data: { module: 'PACKING' },
        loadChildren: () =>
          import('./components/features/production/packing-plan/routes/packing-plan.routes')
            .then(m => m.PACKING_PLAN_ROUTES)
      },

      {
        path: 'day-wise-packing-productions',
        canActivate: [roleGuard],
  data: { module: 'PACKING' },
        loadChildren: () =>
          import('./components/features/production/day-wise-packing-production/routes/day-wise-packing-production.routes')
            .then(m => m.DAY_WISE_PACKING_PRODUCTION_ROUTES)
      }

    ]
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];