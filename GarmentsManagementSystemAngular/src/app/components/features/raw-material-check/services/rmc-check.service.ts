import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RmcCheckRequest } from '../models/rmc-check-request';
import { Observable } from 'rxjs';
import { RmcCheckResponse } from '../models/rmc-check-response';

@Injectable({
  providedIn: 'root',
})
export class RmcCheckService {


   private readonly apiUrl =
    `${environment.apiUrl}/rmc-checks`;

  constructor(
    private http: HttpClient
  ) { }

  // ===========================
  // Generate RMC
  // ===========================

  generate(
    request: RmcCheckRequest
  ): Observable<RmcCheckResponse> {

    return this.http.post<RmcCheckResponse>(
      this.apiUrl,
      request
    );

  }

  // ===========================
  // Get All RMC
  // ===========================

  getAll(): Observable<RmcCheckResponse[]> {

    return this.http.get<RmcCheckResponse[]>(
      this.apiUrl
    );

  }

  // ===========================
  // Get RMC By Id
  // ===========================

  getById(
    id: number
  ): Observable<RmcCheckResponse> {

    return this.http.get<RmcCheckResponse>(
      `${this.apiUrl}/${id}`
    );

  }

  // ===========================
  // Delete RMC
  // ===========================

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
}
