export interface FinishingPlanRequest {

     sewingPlanId: number;

  procTrimming: boolean;

  procIroning: boolean;

  procWashing: boolean;

  procButtonAttach: boolean;

  finishingTableNo: string;

  supervisorName: string;

  startDate: string;

  endDate: string;
}
