import { Injectable } from '@angular/core';
import { SewingPlanRequest } from '../models/sewing-plan-request';
import { Observable } from 'rxjs';
import { SewingPlanResponse } from '../models/sewing-plan-response';
import { environment } from '../../../../../environments/environment';
import { CuttingPlanResponse } from '../../cutting-plan/models/cutting-plan-response';
import { ProductionLineResponse } from '../../production-line/models/production-line-response';
import { HttpClient } from '@angular/common/http';
import { LineWiseSewingProgressResponse } from '../models/line-wise-sewing-progress-response';

@Injectable({
  providedIn: 'root',
})
export class SewingPlanService {

    constructor(
    private http: HttpClient
  ) { }

  // =====================================
  // Sewing Plan CRUD
  // =====================================

  create(
    request: SewingPlanRequest
  ): Observable<SewingPlanResponse> {

    return this.http.post<SewingPlanResponse>(
      `${environment.apiUrl}/sewing-plans`,
      request
    );

  }

  update(
    id: number,
    request: SewingPlanRequest
  ): Observable<SewingPlanResponse> {

    return this.http.put<SewingPlanResponse>(
      `${environment.apiUrl}/sewing-plans/${id}`,
      request
    );

  }

  getById(
    id: number
  ): Observable<SewingPlanResponse> {

    return this.http.get<SewingPlanResponse>(
      `${environment.apiUrl}/sewing-plans/${id}`
    );

  }

  getAll(): Observable<SewingPlanResponse[]> {

    return this.http.get<SewingPlanResponse[]>(
      `${environment.apiUrl}/sewing-plans`
    );

  }

  delete(
    id: number
  ): Observable<any> {

    return this.http.delete(
      `${environment.apiUrl}/sewing-plans/${id}`
    );

  }

  // =====================================
  // Completed Cutting Plans
  // =====================================

  getCompletedCuttingPlans(): Observable<CuttingPlanResponse[]> {

    return this.http.get<CuttingPlanResponse[]>(
      `${environment.apiUrl}/cutting-plans/completed`
    );

  }

  // =====================================
  // Production Lines
  // =====================================

  getProductionLines(): Observable<ProductionLineResponse[]> {

    return this.http.get<ProductionLineResponse[]>(
      `${environment.apiUrl}/production-lines`
    );

  }

  // =====================================
  // Cutting Plan Details
  // (Auto Fill Buyer, Order, Style, Color)
  // =====================================

  getCuttingPlanById(
    id: number
  ): Observable<CuttingPlanResponse> {

    return this.http.get<CuttingPlanResponse>(
      `${environment.apiUrl}/cutting-plans/${id}`
    );

  }

  getLineWiseProgress(
  sewingPlanId: number
) {

  return this.http.get<LineWiseSewingProgressResponse[]>(

    `${environment.apiUrl}/day-wise-sewing-productions/line-progress/${sewingPlanId}`

  );

}

}
