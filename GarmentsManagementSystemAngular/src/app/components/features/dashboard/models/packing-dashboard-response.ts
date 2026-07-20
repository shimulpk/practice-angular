import { RecentPackingPlanResponse } from "./recent-packing-plan-response";
import { TodayPackingResponse } from "./today-packing-response";

export interface PackingDashboardResponse {

     // Summary

  todayPacked: number;

  todayReject: number;

  totalPlans: number;

  pendingPlans: number;

  completedPlans: number;

  // Tables

  todayPackings: TodayPackingResponse[];

  recentPlans: RecentPackingPlanResponse[];
}
