import { Routes } from "@angular/router";

import { SewingPlanForm } from "../pages/sewing-plan-form/sewing-plan-form";

import { SewingPlanList } from "../pages/sewing-plan-list/sewing-plan-list";

export const SEWING_PLAN_ROUTES: Routes = [

  {
    path: '',
    component: SewingPlanList
  },

  {
    path: 'add',
    component: SewingPlanForm
  }

];