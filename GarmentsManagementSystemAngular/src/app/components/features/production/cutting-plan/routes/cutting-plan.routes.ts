import { Routes } from "@angular/router";
import { CuttingPlanList } from "../pages/cutting-plan-list/cutting-plan-list";
import { CuttingPlanForm } from "../pages/cutting-plan-form/cutting-plan-form";
import { CuttingPlanDetails } from "../pages/cutting-plan-details/cutting-plan-details";

export const CUTTING_PLAN_ROUTES: Routes = [

  {
    path: '',
    component: CuttingPlanList
  },

  {
    path: 'add',
    component: CuttingPlanForm
  },

  {
    path: 'edit/:id',
    component: CuttingPlanForm
  },

  {
    path: ':id',
    component: CuttingPlanDetails
  }

];