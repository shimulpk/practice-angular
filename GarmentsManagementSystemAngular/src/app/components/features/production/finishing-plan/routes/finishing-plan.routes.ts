import { Routes } from "@angular/router";
import { FinishingPlanList } from "../pages/finishing-plan-list/finishing-plan-list";
import { FinishingPlanForm } from "../pages/finishing-plan-form/finishing-plan-form";
import { FinishingPlanDetails } from "../pages/finishing-plan-details/finishing-plan-details";

export const FINISHING_PLAN_ROUTES: Routes = [

  {
    path: '',
    component: FinishingPlanList
  },

  {
    path: 'add',
    component: FinishingPlanForm
  },

  {
    path: 'edit/:id',
    component: FinishingPlanForm
  },

  {
    path: ':id',
    component: FinishingPlanDetails
  }

];