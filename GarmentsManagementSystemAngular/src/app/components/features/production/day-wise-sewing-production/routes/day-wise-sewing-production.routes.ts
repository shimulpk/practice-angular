import { Routes } from "@angular/router";
import { DayWiseSewingProductionList } from "../pages/day-wise-sewing-production-list/day-wise-sewing-production-list";
import { DayWiseSewingProductionForm } from "../pages/day-wise-sewing-production-form/day-wise-sewing-production-form";
import { DayWiseSewingProductionDetails } from "../pages/day-wise-sewing-production-details/day-wise-sewing-production-details";

export const DAY_WISE_SEWING_PRODUCTION_ROUTES: Routes = [

  {
    path: '',
    component: DayWiseSewingProductionList
  },

  {
    path: 'add',
    component: DayWiseSewingProductionForm
  },

  {
    path: 'edit/:id',
    component: DayWiseSewingProductionForm
  },

  {
    path: ':id',
    component: DayWiseSewingProductionDetails
  }

];