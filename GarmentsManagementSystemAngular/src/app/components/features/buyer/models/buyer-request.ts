import { BuyerContactRequest } from "./buyer-contact-request";

export interface BuyerRequest {

     buyerCode: string;

  buyerName: string;

  country: string;

  address: string;

  website: string;

  currency: string;

  paymentTerms: string;

  contacts: BuyerContactRequest[];
}
