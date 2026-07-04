import { Routes } from "@angular/router";
import { StyleList } from "../pages/style-list/style-list";
import { StyleForm } from "../pages/style-form/style-form";
import { StyleDetails } from "../pages/style-details/style-details";

export const STYLE_ROUTES: Routes = [

  {
    path: '',
    component: StyleList
  },

  {
    path: 'add',
    component: StyleForm
  },

  {
    path: 'edit/:id',
    component: StyleForm
  },

  {
    path: 'view/:id',
    component: StyleDetails
  }

];