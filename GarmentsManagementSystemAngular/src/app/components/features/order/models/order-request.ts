import { OrderItemRequest } from "./order-item-request";

export interface OrderRequest {

     orderId: string;

  poNumber: string;

  buyerId: number;

  styleId: number;

  orderDate: string;

  shipDate: string;

  status: string;

  shippingAddress: string;

  items: OrderItemRequest[];
}
