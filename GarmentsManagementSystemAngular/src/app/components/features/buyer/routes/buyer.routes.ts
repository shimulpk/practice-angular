import { Routes } from "@angular/router";
import { BuyerList } from "../pages/buyer-list/buyer-list";
import { BuyerForm } from "../pages/buyer-form/buyer-form";
import { BuyerDetails } from "../pages/buyer-details/buyer-details";


export const BUYER_ROUTES: Routes = [

  {
    path: '',
    component: BuyerList
  },

  {
    path: 'add',
    component: BuyerForm
  },

  {
    path: 'edit/:id',
    component: BuyerForm
  },

  {
    path: 'view/:id',
    component: BuyerDetails
  }

];