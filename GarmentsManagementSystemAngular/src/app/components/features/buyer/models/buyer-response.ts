import { BuyerContactResponse } from "./buyer-contact-response";

export interface BuyerResponse {

     id: number;

  buyerCode: string;

  buyerName: string;

  country: string;

  address: string;

  website: string;

  currency: string;

  paymentTerms: string;

  active: boolean;

  contacts: BuyerContactResponse[];
}
