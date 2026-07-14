import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DayWiseSewingProductionResponse } from '../models/day-wise-sewing-production-response';
import { DayWiseSewingProductionRequest } from '../models/day-wise-sewing-production-request';
import { SewingPlanProgressResponse } from '../models/sewing-plan-progress-response';

@Injectable({
  providedIn: 'root',
})
export class DayWiseSewingProductionService {

  private apiUrl =
    `${environment.apiUrl}/day-wise-sewing-productions`;

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<DayWiseSewingProductionResponse[]> {

    return this.http.get<DayWiseSewingProductionResponse[]>(
      this.apiUrl
    );

  }

  getById(
    id: number
  ): Observable<DayWiseSewingProductionResponse> {

    return this.http.get<DayWiseSewingProductionResponse>(
      `${this.apiUrl}/${id}`
    );

  }

  create(
    request: DayWiseSewingProductionRequest
  ): Observable<DayWiseSewingProductionResponse> {

    return this.http.post<DayWiseSewingProductionResponse>(
      this.apiUrl,
      request
    );

  }

  update(
    id: number,
    request: DayWiseSewingProductionRequest
  ): Observable<DayWiseSewingProductionResponse> {

    return this.http.put<DayWiseSewingProductionResponse>(
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
    sewingPlanId: number,
    productionLineId: number
  ): Observable<SewingPlanProgressResponse> {

    return this.http.get<SewingPlanProgressResponse>(
      `${this.apiUrl}/progress`,
      {
        params: {
          sewingPlanId,
          productionLineId
        }
      }
    );

  }


  getBySewingPlan(
  sewingPlanId: number
): Observable<DayWiseSewingProductionResponse[]> {

   console.log(this.apiUrl);

  return this.http.get<DayWiseSewingProductionResponse[]>(
    `${this.apiUrl}/sewing-plan/${sewingPlanId}`
  );

}

}
