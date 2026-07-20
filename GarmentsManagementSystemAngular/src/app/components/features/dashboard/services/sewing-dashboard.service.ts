import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SewingDashboardResponse } from '../models/sewing-dashboard-response';

@Injectable({
  providedIn: 'root',
})
export class SewingDashboardService {



  private apiUrl =
    `${environment.apiUrl}/dashboard/sewing`;

  constructor(
    private http: HttpClient
  ) {}

  getDashboard(): Observable<SewingDashboardResponse> {

    return this.http.get<SewingDashboardResponse>(
      this.apiUrl
    );

  }
}
