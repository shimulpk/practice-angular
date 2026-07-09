import { PurchaseOrderItemResponse } from "./purchase-order-item-response";

export interface PurchaseOrderResponse {

    id: number;

  poNo: string;

  poDate: string;

  vendorId: number;

  vendorName: string;

  storeRequisitionId: number;

  requisitionNo: string;

  status: string;

  grandTotal: number;

  remarks: string;

  items: PurchaseOrderItemResponse[];
}
