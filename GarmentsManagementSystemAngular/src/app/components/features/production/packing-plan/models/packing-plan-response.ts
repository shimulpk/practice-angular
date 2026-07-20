export interface PackingPlanResponse {
     id: number;

  packingPlanId: string;

  finishingPlanId: number;

  finishingPlanCode: string;

  orderId: number;

  orderNo: string;

  buyerName: string;

  styleNo: string;

  color: string;

  totalOrderQty: number;

  inputQty: number;

  totalPackedQty: number;

  rejectionQty: number;

  packingMethod: string;

  pcsPerCarton: number;

  totalPlannedCartons: number;

  polyBagType: string;

  hangTag: boolean;

  packingSupervisor: string;

  startDate: string;

  expectedShipmentDate: string;

  status: string;

}
