import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CuttingDashboardResponse } from '../models/cutting-dashboard-response';

@Injectable({
  providedIn: 'root',
})
export class CuttingDashboardService {

  private apiUrl = `${environment.apiUrl}/dashboard/cutting`; 

  constructor( private http: HttpClient ) {}

  getDashboard(): Observable<CuttingDashboardResponse>{ 
    return this.http.get<CuttingDashboardResponse>
    ( this.apiUrl );
    
   }
}
