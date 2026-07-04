import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderResponse } from '../models/order-response';
import { OrderRequest } from '../models/order-request';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

   private readonly apiUrl =
    `${environment.apiUrl}/orders`;

  constructor(
    private http: HttpClient
  ) { }

  // ===========================
  // Get All Orders
  // ===========================

  getAll(): Observable<OrderResponse[]> {

    return this.http.get<OrderResponse[]>(
      this.apiUrl
    );

  }

  // ===========================
  // Get Order By Id
  // ===========================

  getById(id: number): Observable<OrderResponse> {

    return this.http.get<OrderResponse>(
      `${this.apiUrl}/${id}`
    );

  }

  // ===========================
  // Create Order
  // ===========================

  create(request: OrderRequest): Observable<OrderResponse> {

    return this.http.post<OrderResponse>(
      this.apiUrl,
      request
    );

  }

  // ===========================
  // Update Order
  // ===========================

  update(
    id: number,
    request: OrderRequest
  ): Observable<OrderResponse> {

    return this.http.put<OrderResponse>(
      `${this.apiUrl}/${id}`,
      request
    );

  }

  // ===========================
  // Delete Order
  // ===========================

  delete(id: number): Observable<string> {

    return this.http.delete(
      `${this.apiUrl}/${id}`,
      {
        responseType: 'text'
      }
    );

  }

}
