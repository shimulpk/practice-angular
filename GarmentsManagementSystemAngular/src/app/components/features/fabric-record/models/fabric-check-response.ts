import { FabricDetailsResponse } from "./fabric-details-response";

export interface FabricCheckResponse {

     id: number;

  orderDbId: number;

  orderCode: string;

  poNumber: string;

  styleId: number;

  styleCode: string;

  styleName: string;

  createdAt: string;

  totalFabricRequired: number;

  details: FabricDetailsResponse[];
}
