import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ProductionLineRequest } from '../models/production-line-request';
import { Observable } from 'rxjs';
import { ProductionLineResponse } from '../models/production-line-response';

@Injectable({
  providedIn: 'root',
})
export class ProductionLineService {

   private readonly apiUrl =
    `${environment.apiUrl}/production-lines`;

  constructor(
    private http: HttpClient
  ) { }

  // ==========================
  // Create
  // ==========================

  create(
    request: ProductionLineRequest
  ): Observable<ProductionLineResponse> {

    return this.http.post<ProductionLineResponse>(
      this.apiUrl,
      request
    );

  }

  // ==========================
  // Update
  // ==========================

  update(
    id: number,
    request: ProductionLineRequest
  ): Observable<ProductionLineResponse> {

    return this.http.put<ProductionLineResponse>(
      `${this.apiUrl}/${id}`,
      request
    );

  }

  // ==========================
  // Get By Id
  // ==========================

  getById(
    id: number
  ): Observable<ProductionLineResponse> {

    return this.http.get<ProductionLineResponse>(
      `${this.apiUrl}/${id}`
    );

  }

  // ==========================
  // Get All
  // ==========================

  getAll(): Observable<ProductionLineResponse[]> {

    return this.http.get<ProductionLineResponse[]>(
      this.apiUrl
    );

  }

  // ==========================
  // Delete
  // ==========================

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
