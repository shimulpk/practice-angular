import { Routes } from "@angular/router";
import { DayWisePackingProductionList } from "../pages/day-wise-packing-production-list/day-wise-packing-production-list";
import { DayWisePackingProductionForm } from "../pages/day-wise-packing-production-form/day-wise-packing-production-form";
import { DayWisePackingProductionDetails } from "../pages/day-wise-packing-production-details/day-wise-packing-production-details";

export const DAY_WISE_PACKING_PRODUCTION_ROUTES: Routes = [

  {
    path: '',
    component: DayWisePackingProductionList
  },

  {
    path: 'add',
    component: DayWisePackingProductionForm
  },

  {
    path: 'edit/:id',
    component: DayWisePackingProductionForm
  },

  {
    path: ':id',
    component: DayWisePackingProductionDetails
  }

];