import { RmcDetailsResponse } from "./rmc-details-response";

export interface RmcCheckResponse {

     id: number;

  orderId: number;

  styleId: number;

  buyerName: string;

  styleName: string;

  totalOrderQty: number;

  grandTotalCost: number;

  createdAt: string;

  rmcDetailsList: RmcDetailsResponse[];
}
