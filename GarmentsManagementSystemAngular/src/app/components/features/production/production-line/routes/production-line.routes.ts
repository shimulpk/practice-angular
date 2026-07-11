import { Routes } from "@angular/router";
import { ProductionLineList } from "../pages/production-line-list/production-line-list";
import { ProductionLineForm } from "../pages/production-line-form/production-line-form";

export const PRODUCTION_LINE_ROUTES: Routes = [

  {
    path: '',
    component: ProductionLineList
  },

  {
    path: 'add',
    component: ProductionLineForm
  },

  {
    path: 'edit/:id',
    component: ProductionLineForm
  }

];