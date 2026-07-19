import { OrderTracking } from "./order-tracking";

export interface DashboardResponse {
 totalUsers: number;

  totalBuyers: number;

  totalVendors: number;

  totalItems: number;

  totalOrders: number;

  pendingRequisitions: number;

  pendingPurchaseOrders: number;

  currentStockItems: number;

  todayCuttingPcs: number;

  todaySewingPcs: number;

  todayFinishingPcs: number;

  todayPackingPcs: number;

  orderTracking: OrderTracking[];
}
