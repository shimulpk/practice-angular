export interface FinishingPlanResponse {

     id: number;

  finishingPlanId: string;

  sewingPlanId: number;

  sewingPlanCode: string;

  buyerName: string;

  orderNo: string;

  styleNo: string;

  color: string;

  inputQty: number;

  targetQty: number;

  passQty: number;

  rejectionQty: number;

  procTrimming: boolean;

  procIroning: boolean;

  procWashing: boolean;

  procButtonAttach: boolean;

  finishingTableNo: string;

  supervisorName: string;

  startDate: string;

  endDate: string;

  status: string;

}
