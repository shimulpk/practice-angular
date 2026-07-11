import { GoodsReceiveNoteItemResponse } from "./goods-receive-note-item-response";

export interface GoodsReceiveNoteResponse {

    id: number;

  grnNo: string;

  grnDate: string;

  purchaseOrderId: number;

  poNo: string;

  challanNo: string;

  remarks: string;

  items: GoodsReceiveNoteItemResponse[];
}
