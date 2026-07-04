import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { UomResponse } from '../models/uom-response';
import { Observable } from 'rxjs';
import { UomRequest } from '../models/uom-request';

@Injectable({
  providedIn: 'root',
})
export class UomService {

   private readonly apiUrl = `${environment.apiUrl}/uoms`;

  constructor(
    private http: HttpClient
  ) { }

  // ============================
  // Get All UOM
  // ============================

  getAll(): Observable<UomResponse[]> {

    return this.http.get<UomResponse[]>(this.apiUrl);

  }

  // ============================
  // Get UOM By Id
  // ============================

  getById(id: number): Observable<UomResponse> {

    return this.http.get<UomResponse>(
      `${this.apiUrl}/${id}`
    );

  }

  // ============================
  // Create UOM
  // ============================

  create(request: UomRequest): Observable<UomResponse> {

    return this.http.post<UomResponse>(
      this.apiUrl,
      request
    );

  }

  // ============================
  // Update UOM
  // ============================

  update(
    id: number,
    request: UomRequest
  ): Observable<UomResponse> {

    return this.http.put<UomResponse>(
      `${this.apiUrl}/${id}`,
      request
    );

  }

  // ============================
  // Delete UOM
  // ============================

  delete(id: number): Observable<string> {

    return this.http.delete(
      `${this.apiUrl}/${id}`,
      {
        responseType: 'text'
      }
    );

  }
}
