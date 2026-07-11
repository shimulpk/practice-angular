import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CuttingPlanRequest } from '../models/cutting-plan-request';
import { Observable } from 'rxjs';
import { CuttingPlanResponse } from '../models/cutting-plan-response';
import { CuttingPlanProgress } from '../models/cutting-plan-progress';
import { BuyerResponse } from '../../../buyer/models/buyer-response';
import { OrderResponse } from '../models/order-response';
import { FabricCheckResponse } from '../models/fabric-check-response';

@Injectable({
  providedIn: 'root',
})
export class CuttingPlanService {


   private readonly apiUrl =
    `${environment.apiUrl}/cutting-plans`;

  constructor(
    private http: HttpClient
  ) { }

  // ==========================
  // Cutting Plan CRUD
  // ==========================

  create(
    request: CuttingPlanRequest
  ): Observable<CuttingPlanResponse> {

    return this.http.post<CuttingPlanResponse>(
      this.apiUrl,
      request
    );

  }

  update(
    id: number,
    request: CuttingPlanRequest
  ): Observable<CuttingPlanResponse> {

    return this.http.put<CuttingPlanResponse>(
      `${this.apiUrl}/${id}`,
      request
    );

  }

  getById(
    id: number
  ): Observable<CuttingPlanResponse> {

    return this.http.get<CuttingPlanResponse>(
      `${this.apiUrl}/${id}`
    );

  }

  getAll(): Observable<CuttingPlanResponse[]> {

    return this.http.get<CuttingPlanResponse[]>(
      this.apiUrl
    );

  }

  delete(
    id: number
  ): Observable<string> {

    return this.http.delete(
      `${this.apiUrl}/${id}`,
      {
        responseType: 'text'
      }
    );

  }

  // ==========================
  // Pending Cutting Plans
  // ==========================

  getPendingPlans(): Observable<CuttingPlanResponse[]> {

    return this.http.get<CuttingPlanResponse[]>(
      `${this.apiUrl}/pending`
    );

  }

  // ==========================
  // Progress
  // ==========================

  getProgress(
    cuttingPlanId: number
  ): Observable<CuttingPlanProgress> {

    return this.http.get<CuttingPlanProgress>(
      `${environment.apiUrl}/day-wise-cutting-production/progress/${cuttingPlanId}`
    );

  }

  // ==========================
  // Buyer
  // ==========================

  getBuyers(): Observable<BuyerResponse[]> {

    return this.http.get<BuyerResponse[]>(
      `${environment.apiUrl}/buyers`
    );

  }

  // ==========================
  // Orders By Buyer
  // ==========================

  getOrdersByBuyer(
    buyerId: number
  ): Observable<OrderResponse[]> {

    return this.http.get<OrderResponse[]>(
      `${environment.apiUrl}/orders/buyer/${buyerId}`
    );

  }

  // ==========================
  // Fabric Record By Order
  // ==========================

  getFabricByOrder(
    orderId: number
  ): Observable<FabricCheckResponse> {

    return this.http.get<FabricCheckResponse>(
      `${environment.apiUrl}/fabrics-check/order/${orderId}`
    );

  }

}
