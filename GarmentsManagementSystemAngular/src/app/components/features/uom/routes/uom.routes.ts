import { Routes } from "@angular/router";
import { UomList } from "../pages/uom-list/uom-list";
import { UomForm } from "../pages/uom-form/uom-form";
import { UomDetails } from "../pages/uom-details/uom-details";

export const UOM_ROUTES: Routes = [

  {
    path: '',
    component: UomList
  },

  {
    path: 'add',
    component: UomForm
  },

  {
    path: 'edit/:id',
    component: UomForm
  },

  {
    path: 'view/:id',
    component: UomDetails
  }

];