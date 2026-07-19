import { PendingRequisitionResponse } from "./pending-requisition-response";
import { RecentGrnResponse } from "./recent-grn-response";
import { RecentPurchaseOrderResponse } from "./recent-purchase-order-response";

export interface PurchaseDashboardResponse {

     // Summary

  totalVendors: number;

  pendingRequisitions: number;

  pendingPurchaseOrders: number;

  todayPurchaseOrders: number;

  todayGoodsReceive: number;

  // Tables

  recentPurchaseOrders: RecentPurchaseOrderResponse[];

  pendingRequisitionsList: PendingRequisitionResponse[];

  recentGoodsReceives: RecentGrnResponse[];

}
