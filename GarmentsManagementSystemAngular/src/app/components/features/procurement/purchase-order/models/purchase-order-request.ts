import { PurchaseOrderItemRequest } from "./purchase-order-item-request";

export interface PurchaseOrderRequest {

     poDate: string;

  vendorId: number;

  storeRequisitionId: number;

  remarks: string;

  items: PurchaseOrderItemRequest[];

}
