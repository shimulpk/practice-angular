import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DayWiseCuttingProductionRequest } from '../models/day-wise-cutting-production-request';
import { Observable } from 'rxjs';
import { DayWiseCuttingProductionResponse } from '../models/day-wise-cutting-production-response';
import { CuttingPlanProgressResponse } from '../models/cutting-plan-progress-response';
import { CuttingPlanResponse } from '../../cutting-plan/models/cutting-plan-response';

@Injectable({
  providedIn: 'root',
})
export class DayWiseCuttingProductionService {

   private apiUrl =
    `${environment.apiUrl}/day-wise-cutting-production`;

  private cuttingPlanApi =
    `${environment.apiUrl}/cutting-plans`;

  constructor(
    private http: HttpClient
  ) { }

  // ==========================
  // Create
  // ==========================

  create(
    request: DayWiseCuttingProductionRequest
  ): Observable<DayWiseCuttingProductionResponse> {

    return this.http.post<DayWiseCuttingProductionResponse>(
      this.apiUrl,
      request
    );

  }

  // ==========================
  // Get All
  // ==========================

  getAll(): Observable<DayWiseCuttingProductionResponse[]> {

    return this.http.get<DayWiseCuttingProductionResponse[]>(
      this.apiUrl
    );

  }

  // ==========================
  // Get By Id
  // ==========================

  getById(
    id: number
  ): Observable<DayWiseCuttingProductionResponse> {

    return this.http.get<DayWiseCuttingProductionResponse>(
      `${this.apiUrl}/${id}`
    );

  }

  // ==========================
  // Delete
  // ==========================

  delete(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );

  }

  // ==========================
  // Progress
  // ==========================

  getProgress(
    cuttingPlanId: number
  ): Observable<CuttingPlanProgressResponse> {

    return this.http.get<CuttingPlanProgressResponse>(
      `${this.apiUrl}/progress/${cuttingPlanId}`
    );

  }

  // ==========================
  // Cutting Plans
  // ==========================

  getCuttingPlans(): Observable<CuttingPlanResponse[]> {

    return this.http.get<CuttingPlanResponse[]>(
      this.cuttingPlanApi
    );

  }

}
