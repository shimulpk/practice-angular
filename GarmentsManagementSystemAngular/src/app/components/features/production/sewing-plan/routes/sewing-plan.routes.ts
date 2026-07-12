import { Routes } from "@angular/router";

import { SewingPlanForm } from "../pages/sewing-plan-form/sewing-plan-form";
import { SewingPlanDetails } from "../pages/sewing-plan-details/sewing-plan-details";

export const SEWING_PLAN_ROUTES: Routes = [

  {
    path: 'add',
    component: SewingPlanForm
  },

  {
    path: ':id',
    component: SewingPlanDetails
  }

];