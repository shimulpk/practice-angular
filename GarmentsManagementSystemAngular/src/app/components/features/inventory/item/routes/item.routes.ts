import { Routes } from "@angular/router";
import { ItemList } from "../pages/item-list/item-list";
import { ItemForm } from "../pages/item-form/item-form";
import { ItemDetails } from "../pages/item-details/item-details";

export const ITEM_ROUTES: Routes = [

  {
    path: '',
    component: ItemList
  },

  {
    path: 'add',
    component: ItemForm
  },

  {
    path: 'edit/:id',
    component: ItemForm
  },

  {
    path: 'view/:id',
    component: ItemDetails
  }

];