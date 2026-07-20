import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductionDashboardResponse } from '../models/production-dashboard-response';

@Injectable({
  providedIn: 'root',
})
export class ProductionDashboardService {

    private apiUrl =
    `${environment.apiUrl}/dashboard/production`;

  constructor(
    private http: HttpClient
  ) {}

  getDashboard(): Observable<ProductionDashboardResponse> {

    return this.http.get<ProductionDashboardResponse>(
      this.apiUrl
    );

  }
}
