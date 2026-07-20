import { Routes } from "@angular/router";
import { PackingPlanList } from "../pages/packing-plan-list/packing-plan-list";
import { PackingPlanForm } from "../pages/packing-plan-form/packing-plan-form";
import { PackingPlanDetails } from "../pages/packing-plan-details/packing-plan-details";

export const PACKING_PLAN_ROUTES: Routes = [

  {
    path: '',
    component: PackingPlanList
  },

  {
    path: 'add',
    component: PackingPlanForm
  },

  {
    path: 'edit/:id',
    component: PackingPlanForm
  },

  {
    path: ':id',
    component: PackingPlanDetails
  }

];