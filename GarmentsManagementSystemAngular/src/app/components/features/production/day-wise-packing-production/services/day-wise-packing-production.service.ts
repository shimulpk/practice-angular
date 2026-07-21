import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DayWisePackingProductionResponse } from '../models/day-wise-packing-production-response';
import { DayWisePackingProductionRequest } from '../models/day-wise-packing-production-request';
import { PackingPlanProgressResponse } from '../models/packing-plan-progress-response';

@Injectable({
  providedIn: 'root',
})
export class DayWisePackingProductionService {

    private apiUrl =
    `${environment.apiUrl}/day-wise-packing-productions`;

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<DayWisePackingProductionResponse[]> {

    return this.http.get<DayWisePackingProductionResponse[]>(
      this.apiUrl
    );

  }

  getById(
    id: number
  ): Observable<DayWisePackingProductionResponse> {

    return this.http.get<DayWisePackingProductionResponse>(
      `${this.apiUrl}/${id}`
    );

  }

  create(
    request: DayWisePackingProductionRequest
  ): Observable<DayWisePackingProductionResponse> {

    return this.http.post<DayWisePackingProductionResponse>(
      this.apiUrl,
      request
    );

  }

  update(
    id: number,
    request: DayWisePackingProductionRequest
  ): Observable<DayWisePackingProductionResponse> {

    return this.http.put<DayWisePackingProductionResponse>(
      `${this.apiUrl}/${id}`,
      request
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

  getProgress(
    packingPlanId: number
  ): Observable<PackingPlanProgressResponse> {

    return this.http.get<PackingPlanProgressResponse>(
      `${this.apiUrl}/progress`,
      {
        params: {
          packingPlanId
        }
      }
    );

  }

}
