import { LineWiseSewingProgressResponse } from "./line-wise-sewing-progress-response";
import { SewingTargetResponse } from "./sewing-target-response";

export interface SewingPlanResponse {

      id: number;

  sewingPlanId: string;

  cuttingPlanId: number;

  cuttingPlanCode: string;

  buyerName: string;

  orderNo: string;

  styleNo: string;

  color: string;

  inputReceivedQty: number;

  outputQty: number;

  rejectionQty: number;

  startDate: string;

  endDate: string;

  status: string;

  targets: SewingTargetResponse[];

  lineProgress: LineWiseSewingProgressResponse[];

 

}
