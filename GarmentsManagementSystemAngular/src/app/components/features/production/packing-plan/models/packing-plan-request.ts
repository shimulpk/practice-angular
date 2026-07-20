export interface PackingPlanRequest {

     finishingPlanId: number;

  pcsPerCarton: number;

  packingMethod: string;

  polyBagType: string;

  hangTag: boolean;

  packingSupervisor: string;

  startDate: string;

  expectedShipmentDate: string;
}
