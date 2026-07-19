import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardResponse } from '../models/dashboard-response';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {


   private apiUrl = `${environment.apiUrl}/dashboard`;

  constructor(
    private http: HttpClient
  ) {}

  getDashboard(): Observable<DashboardResponse> {

    return this.http.get<DashboardResponse>(this.apiUrl);

  }

}
