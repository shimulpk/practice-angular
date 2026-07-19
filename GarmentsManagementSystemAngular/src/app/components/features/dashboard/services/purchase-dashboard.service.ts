import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PurchaseDashboardResponse } from '../models/purchase-dashboard-response';

@Injectable({
  providedIn: 'root',
})
export class PurchaseDashboardService {

 private apiUrl =
    `${environment.apiUrl}/dashboard/purchase`;

  constructor(
    private http: HttpClient
  ) {}

  getDashboard(): Observable<PurchaseDashboardResponse> {

    return this.http.get<PurchaseDashboardResponse>(
      this.apiUrl
    );

  }


}
