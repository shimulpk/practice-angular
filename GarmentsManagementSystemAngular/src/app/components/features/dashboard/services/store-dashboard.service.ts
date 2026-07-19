import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StoreDashboardResponse } from '../models/store-dashboard-response';

@Injectable({
  providedIn: 'root',
})
export class StoreDashboardService {


   private apiUrl =
    `${environment.apiUrl}/dashboard/store`;

  constructor(
    private http: HttpClient
  ) {}

  getDashboard(): Observable<StoreDashboardResponse> {

    return this.http.get<StoreDashboardResponse>(
      this.apiUrl
    );

  }
}
