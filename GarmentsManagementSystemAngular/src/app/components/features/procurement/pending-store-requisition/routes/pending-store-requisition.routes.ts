import { Routes } from "@angular/router";
import { PendingStoreRequisitionList } from "../pages/pending-store-requisition-list/pending-store-requisition-list";
import { PendingStoreRequisitionDetails } from "../pages/pending-store-requisition-details/pending-store-requisition-details";

export const PENDING_STORE_REQUISITION_ROUTES: Routes = [

  {
    path: '',
    component: PendingStoreRequisitionList
  },

  {
    path: 'view/:id',
    component: PendingStoreRequisitionDetails
  }

];