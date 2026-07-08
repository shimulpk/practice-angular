import { Routes } from "@angular/router";
import { StoreRequisitionList } from "../pages/store-requisition-list/store-requisition-list";
import { StoreRequisitionForm } from "../pages/store-requisition-form/store-requisition-form";
import { StoreRequisitionDetails } from "../pages/store-requisition-details/store-requisition-details";

export const STORE_REQUISITION_ROUTES: Routes = [

  {
    path: '',
    component: StoreRequisitionList
  },

  {
    path: 'add',
    component: StoreRequisitionForm
  },

  {
    path: 'edit/:id',
    component: StoreRequisitionForm
  },

  {
    path: 'view/:id',
    component: StoreRequisitionDetails
  }

];