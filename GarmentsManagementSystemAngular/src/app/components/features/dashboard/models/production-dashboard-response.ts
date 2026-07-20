import { TodayProductionResponse } from "./today-production-response";

export interface ProductionDashboardResponse {



  // Summary Cards

  pendingOrders: number;

  confirmedOrders: number;

  todayCutting: number;

  todaySewing: number;

  todayFinishing: number;

  todayPacking: number;

  // Table

  todayProductions: TodayProductionResponse[];
}
