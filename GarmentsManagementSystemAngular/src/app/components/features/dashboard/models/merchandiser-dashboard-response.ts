import { MerchandiserOrderResponse } from "./merchandiser-order-response";

export interface MerchandiserDashboardResponse {

     totalBuyers: number;

  totalStyles: number;

  totalOrders: number;

  totalBom: number;

  totalRawMaterialChecks: number;

  totalFabricChecks: number;

  recentOrders: MerchandiserOrderResponse[];

}
