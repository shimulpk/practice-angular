export interface PackingProductionSummaryResponse {


     packingPlanId: number;

  packingPlanCode: string;

  buyerName: string;

  orderNo: string;

  styleNo: string;

  color: string;

  targetQty: number;

  packedSoFar: number;

  remaining: number;

  status: string;
}
