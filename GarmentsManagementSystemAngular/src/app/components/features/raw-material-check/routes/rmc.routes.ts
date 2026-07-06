import { Routes } from "@angular/router";
import { RmcList } from "../pages/rmc-list/rmc-list";
import { RmcForm } from "../pages/rmc-form/rmc-form";
import { RmcDetails } from "../pages/rmc-details/rmc-details";

export const RMC_ROUTES: Routes = [

  // ==========================
  // Generate Raw Material Check
  // ==========================

  {
    path: '',
    component: RmcList
  },

  {
    path: 'add',
    component: RmcForm
  },

  {
    path: ':id',
    component: RmcDetails
  }

];