import { RecentFinishingPlanResponse } from "./recent-finishing-plan-response";
import { TodayFinishingResponse } from "./today-finishing-response";

export interface FinishingDashboardResponse {

     // Summary

  todayFinished: number;

  todayReject: number;

  totalPlans: number;

  pendingPlans: number;

  completedPlans: number;

  // Tables

  todayFinishings: TodayFinishingResponse[];

  recentPlans: RecentFinishingPlanResponse[];
}
