import { StoreRequisitionItemResponse } from "./store-requisition-item-response";

export interface StoreRequisitionResponse {

     id: number;

  prNo: string;

  requisitionDate: string;

  requestedBy: string;

  department: string;

  remarks: string;

  status: string;

  items: StoreRequisitionItemResponse[];
}
