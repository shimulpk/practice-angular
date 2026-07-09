import { Routes } from "@angular/router";
import { PurchaseOrderList } from "../pages/purchase-order-list/purchase-order-list";
import { PurchaseOrderForm } from "../pages/purchase-order-form/purchase-order-form";
import { PurchaseOrderDetails } from "../pages/purchase-order-details/purchase-order-details";

export const PURCHASE_ORDER_ROUTES: Routes = [

  {
    path: '',
    component: PurchaseOrderList
  },

  {
    path: 'add',
    component: PurchaseOrderForm
  },

  {
    path: 'edit/:id',
    component: PurchaseOrderForm
  },

  {
    path: 'view/:id',
    component: PurchaseOrderDetails
  }

];