import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PurchaseOrderResponse } from '../models/purchase-order-response';
import { PurchaseOrderRequest } from '../models/purchase-order-request';

@Injectable({
  providedIn: 'root',
})
export class PurchaseOrderService {

   private readonly apiUrl =
    `${environment.apiUrl}/purchase-orders`;

  constructor(
    private http: HttpClient
  ) { }

  // =====================================
  // Get All Purchase Orders
  // =====================================

  getAll(): Observable<PurchaseOrderResponse[]> {

    return this.http.get<PurchaseOrderResponse[]>(
      this.apiUrl
    );

  }

  // =====================================
  // Get Purchase Order By Id
  // =====================================

  getById(id: number): Observable<PurchaseOrderResponse> {

    return this.http.get<PurchaseOrderResponse>(
      `${this.apiUrl}/${id}`
    );

  }

  // =====================================
  // Create Purchase Order
  // =====================================

  create(
    request: PurchaseOrderRequest
  ): Observable<PurchaseOrderResponse> {

    return this.http.post<PurchaseOrderResponse>(
      this.apiUrl,
      request
    );

  }

  // =====================================
  // Update Purchase Order
  // =====================================

  update(
    id: number,
    request: PurchaseOrderRequest
  ): Observable<PurchaseOrderResponse> {

    return this.http.put<PurchaseOrderResponse>(
      `${this.apiUrl}/${id}`,
      request
    );

  }

  // =====================================
  // Delete Purchase Order
  // =====================================

  delete(id: number): Observable<string> {

    return this.http.delete(
      `${this.apiUrl}/${id}`,
      {
        responseType: 'text'
      }
    );

  }

}
