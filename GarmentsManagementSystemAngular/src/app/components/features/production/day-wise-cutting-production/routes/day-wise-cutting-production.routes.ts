import { Routes } from "@angular/router";
import { DayWiseCuttingProductionList } from "../pages/day-wise-cutting-production-list/day-wise-cutting-production-list";
import { DayWiseCuttingProductionForm } from "../pages/day-wise-cutting-production-form/day-wise-cutting-production-form";
import { DayWiseCuttingProductionDetails } from "../pages/day-wise-cutting-production-details/day-wise-cutting-production-details";

export const DAY_WISE_CUTTING_PRODUCTION_ROUTES: Routes = [

  {
    path: '',
    component: DayWiseCuttingProductionList
  },

  {
    path: 'add',
    component: DayWiseCuttingProductionForm
  },

  {
    path: 'edit/:id',
    component: DayWiseCuttingProductionForm
  },

  {
    path: ':id',
    component: DayWiseCuttingProductionDetails
  }

];