import { SewingTargetRequest } from "./sewing-target-request";

export interface SewingPlanRequest {


     cuttingPlanId: number;

  startDate: string;

  endDate: string;

  targets: SewingTargetRequest[];
}
