import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FinishingPlanResponse } from '../models/finishing-plan-response';
import { FinishingPlanRequest } from '../models/finishing-plan-request';
import { FinishingProgressResponse } from '../models/finishing-progress-response';

@Injectable({
  providedIn: 'root',
})
export class FinishingPlanService {

    private apiUrl =
    `${environment.apiUrl}/finishing-plans`;

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<FinishingPlanResponse[]> {

    return this.http.get<FinishingPlanResponse[]>(
      this.apiUrl
    );

  }

  getById(
    id: number
  ): Observable<FinishingPlanResponse> {

    return this.http.get<FinishingPlanResponse>(
      `${this.apiUrl}/${id}`
    );

  }

  create(
    request: FinishingPlanRequest
  ): Observable<FinishingPlanResponse> {

    return this.http.post<FinishingPlanResponse>(
      this.apiUrl,
      request
    );

  }

  update(
    id: number,
    request: FinishingPlanRequest
  ): Observable<FinishingPlanResponse> {

    return this.http.put<FinishingPlanResponse>(
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
      `${environment.apiUrl}/day-wise-finishing-productions/progress`,
      {
        params: {
          finishingPlanId
        }
      }
    );

  }

}
