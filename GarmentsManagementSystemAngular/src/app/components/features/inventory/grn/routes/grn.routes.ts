import { Routes } from "@angular/router";
import { GrnList } from "../pages/grn-list/grn-list";
import { GrnForm } from "../pages/grn-form/grn-form";
import { GrnDetails } from "../pages/grn-details/grn-details";

export const GOODS_RECEIVE_NOTE_ROUTES: Routes = [

  {
    path: '',
    component: GrnList
  },

  {
    path: 'create',
    component: GrnForm
  },

  {
    path: ':id',
    component: GrnDetails
  }

];