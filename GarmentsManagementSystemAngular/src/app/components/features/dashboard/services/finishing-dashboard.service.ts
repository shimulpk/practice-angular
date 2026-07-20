import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FinishingDashboardResponse } from '../models/finishing-dashboard-response';

@Injectable({
  providedIn: 'root',
})
export class FinishingDashboardService {

    private apiUrl =
    `${environment.apiUrl}/dashboard/finishing`;

  constructor(
    private http: HttpClient
  ) {}

  getDashboard(): Observable<FinishingDashboardResponse> {

    return this.http.get<FinishingDashboardResponse>(
      this.apiUrl
    );

  }

}
