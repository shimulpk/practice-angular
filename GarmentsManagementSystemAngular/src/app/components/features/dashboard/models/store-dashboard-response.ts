import { LowStockResponse } from "./low-stock-response";
import { RecentGrnResponse } from "./recent-grn-response";
import { RecentMaterialIssueResponse } from "./recent-material-issue-response";

export interface StoreDashboardResponse {

      totalItems: number;

  currentStockItems: number;

  lowStockItems: number;

  pendingStoreRequisitions: number;

  todayGoodsReceive: number;

  todayMaterialIssue: number;

  recentGoodsReceives: RecentGrnResponse[];

  recentMaterialIssues: RecentMaterialIssueResponse[];

  lowStockList: LowStockResponse[];
}
