import { RecentCuttingPlanResponse } from "./recent-cutting-plan-response";
import { TodayCuttingResponse } from "./today-cutting-response";

export interface CuttingDashboardResponse {

     // Summary

  todayCutting: number;

  todayReject: number;

  totalPlans: number;

  pendingPlans: number;

  completedPlans: number;

  // Tables

  todayCuttings: TodayCuttingResponse[];

  recentPlans: RecentCuttingPlanResponse[];

}
