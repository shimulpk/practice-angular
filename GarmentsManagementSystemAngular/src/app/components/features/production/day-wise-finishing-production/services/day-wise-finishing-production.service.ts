import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DayWiseFinishingProductionResponse } from '../models/day-wise-finishing-production-response';
import { DayWiseFinishingProductionRequest } from '../models/day-wise-finishing-production-request';
import { FinishingProgressResponse } from '../../finishing-plan/models/finishing-progress-response';

@Injectable({
  providedIn: 'root',
})
export class DayWiseFinishingProductionService {


   private apiUrl =
    `${environment.apiUrl}/day-wise-finishing-productions`;

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<DayWiseFinishingProductionResponse[]> {

    return this.http.get<DayWiseFinishingProductionResponse[]>(
      this.apiUrl
    );

  }

  getById(
    id: number
  ): Observable<DayWiseFinishingProductionResponse> {

    return this.http.get<DayWiseFinishingProductionResponse>(
      `${this.apiUrl}/${id}`
    );

  }

  create(
    request: DayWiseFinishingProductionRequest
  ): Observable<DayWiseFinishingProductionResponse> {

    return this.http.post<DayWiseFinishingProductionResponse>(
      this.apiUrl,
      request
    );

  }

  update(
    id: number,
    request: DayWiseFinishingProductionRequest
  ): Observable<DayWiseFinishingProductionResponse> {

    return this.http.put<DayWiseFinishingProductionResponse>(
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
    finishingPlanId: number
  ): Observable<FinishingProgressResponse> {

    return this.http.get<FinishingProgressResponse>(
      `${this.apiUrl}/progress`,
      {
        params: {
          finishingPlanId
        }
      }
    );

  }

  getByFinishingPlan(
  finishingPlanId:number
):Observable<DayWiseFinishingProductionResponse[]>{

  return this.http.get<DayWiseFinishingProductionResponse[]>(

    `${this.apiUrl}/finishing-plan/${finishingPlanId}`

  );

}

}
