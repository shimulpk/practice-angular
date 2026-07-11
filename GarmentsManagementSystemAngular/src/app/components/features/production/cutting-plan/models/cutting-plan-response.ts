export interface CuttingPlanResponse {

      id: number;

  cuttingPlanId: string;

  buyerId: number;

  buyerCode: string;

  buyerName: string;

  orderDbId: number;

  orderId: string;

  poNumber: string;

  styleNo: string;

  fabricType: string;

  color: string;

  totalFabricRequired: number;

  markerLength: number;

  markerWidth: number;

  numberOfPlies: number;

  markerEfficiency: number;

  plannedPieces: number;

  cuttingTableNumber: string;

  cuttingMaster: string;

  startDate: string;

  endDate: string;

  status: string;

   // New Fields
  actualCutPieces: number;

  rejectedPieces: number;

  remainingPieces: number;

  progress: number;
}
