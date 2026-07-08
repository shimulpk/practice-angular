import { StoreRequisitionItemRequest } from "./store-requisition-item-request";

export interface StoreRequisitionRequest {

     requisitionDate: string;

  requestedBy: string;

  department: string;

  remarks: string;

  items: StoreRequisitionItemRequest[];
}
