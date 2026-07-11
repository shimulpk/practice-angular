export interface CuttingPlanRequest {

     buyerId: number;

  orderId: number;

  fabricType: string;

  color: string;

  markerLength: number;

  markerWidth: number;

  numberOfPlies: number;

  markerEfficiency: number;

  cuttingTableNumber: string;

  cuttingMaster: string;

  startDate: string;

  endDate: string;
}
