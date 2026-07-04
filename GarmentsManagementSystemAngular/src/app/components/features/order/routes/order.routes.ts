import { Routes } from "@angular/router";
import { OrderList } from "../pages/order-list/order-list";
import { OrderForm } from "../pages/order-form/order-form";
import { OrderDetails } from "../pages/order-details/order-details";

export const ORDER_ROUTES: Routes = [

  {
    path: '',
    component: OrderList
  },

  {
    path: 'add',
    component: OrderForm
  },

  {
    path: 'edit/:id',
    component: OrderForm
  },

  {
    path: 'view/:id',
    component: OrderDetails
  }

];