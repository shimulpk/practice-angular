import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PackingDashboardResponse } from '../models/packing-dashboard-response';

@Injectable({
  providedIn: 'root',
})
export class PackingDashboardService {


   private apiUrl =
    `${environment.apiUrl}/dashboard/packing`;

  constructor(
    private http: HttpClient
  ) {}

  getDashboard(): Observable<PackingDashboardResponse> {

    return this.http.get<PackingDashboardResponse>(
      this.apiUrl
    );

  }
}
