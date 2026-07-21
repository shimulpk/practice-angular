export interface DayWisePackingProductionResponse {

      id: number;

  packingPlanId: number;

  packingPlanCode: string;

  buyerName: string;

  orderNo: string;

  styleNo: string;

  date: string;

  todayPackedQty: number;

  todayPackedCartons: number;

  todayRejectQty: number;
}
