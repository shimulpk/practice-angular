import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MerchandiserDashboardResponse } from '../models/merchandiser-dashboard-response';

@Injectable({
  providedIn: 'root',
})
export class MerchandiserDashboardService {

   private apiUrl =
    `${environment.apiUrl}/dashboard/merchandiser`;

  constructor(
    private http: HttpClient
  ) {}

  getDashboard(): Observable<MerchandiserDashboardResponse> {

    return this.http.get<MerchandiserDashboardResponse>(
      this.apiUrl
    );

  }

}
