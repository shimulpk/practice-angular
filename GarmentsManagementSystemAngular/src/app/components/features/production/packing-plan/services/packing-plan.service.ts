import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PackingPlanRequest } from '../models/packing-plan-request';
import { Observable } from 'rxjs';
import { PackingPlanResponse } from '../models/packing-plan-response';
import { PackingPlanProgressResponse } from '../models/packing-plan-progress-response';

@Injectable({
  providedIn: 'root',
})
export class PackingPlanService {

    private apiUrl =
    `${environment.apiUrl}/packing-plans`;

  constructor(
    private http: HttpClient
  ) {}

  create(
    request: PackingPlanRequest
  ): Observable<PackingPlanResponse> {

    return this.http.post<PackingPlanResponse>(
      this.apiUrl,
      request
    );

  }

  update(
    id: number,
    request: PackingPlanRequest
  ): Observable<PackingPlanResponse> {

    return this.http.put<PackingPlanResponse>(
      `${this.apiUrl}/${id}`,
      request
    );

  }

  getById(
    id: number
  ): Observable<PackingPlanResponse> {

    return this.http.get<PackingPlanResponse>(
      `${this.apiUrl}/${id}`
    );

  }

  getAll(): Observable<PackingPlanResponse[]> {

    return this.http.get<PackingPlanResponse[]>(
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

  getProgress(
    packingPlanId: number
  ): Observable<PackingPlanProgressResponse> {

    return this.http.get<PackingPlanProgressResponse>(
      `${environment.apiUrl}/day-wise-packing-productions/progress`,
      {
        params: {
          packingPlanId
        }
      }
    );

  }
}
