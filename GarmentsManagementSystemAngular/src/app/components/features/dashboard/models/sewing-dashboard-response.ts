import { RecentSewingPlanResponse } from "./recent-sewing-plan-response";
import { TodaySewingResponse } from "./today-sewing-response";

export interface SewingDashboardResponse {

     // Summary

  todaySewing: number;

  todayReject: number;

  totalPlans: number;

  pendingPlans: number;

  completedPlans: number;

  // Tables

  todaySewings: TodaySewingResponse[];

  recentPlans: RecentSewingPlanResponse[];

}
