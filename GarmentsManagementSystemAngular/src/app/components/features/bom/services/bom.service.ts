import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BomResponse } from '../models/bom-response';
import { BomRequest } from '../models/bom-request';

@Injectable({
  providedIn: 'root',
})
export class BomService {

   private readonly apiUrl = `${environment.apiUrl}/bom-views`;

  constructor(
    private http: HttpClient
  ) { }

  // ===========================
  // Get All BOM Items
  // ===========================

  getAll(): Observable<BomResponse[]> {

    return this.http.get<BomResponse[]>(this.apiUrl);

  }

  // ===========================
  // Get BOM Item By Id
  // ===========================

  getById(id: number): Observable<BomResponse> {

    return this.http.get<BomResponse>(
      `${this.apiUrl}/${id}`
    );

  }

  // ===========================
  // Get BOM Items By Style
  // ===========================

  getByStyle(styleId: number): Observable<BomResponse[]> {

    return this.http.get<BomResponse[]>(
      `${this.apiUrl}/style/${styleId}`
    );

  }

  // ===========================
  // Create BOM Item
  // ===========================

  create(request: BomRequest): Observable<BomResponse> {

    return this.http.post<BomResponse>(
      this.apiUrl,
      request
    );

  }

  // ===========================
  // Update BOM Item
  // ===========================

  update(
    id: number,
    request: BomRequest
  ): Observable<BomResponse> {

    return this.http.put<BomResponse>(
      `${this.apiUrl}/${id}`,
      request
    );

  }

  // ===========================
  // Delete BOM Item
  // ===========================

  delete(id: number): Observable<string> {

    return this.http.delete(
      `${this.apiUrl}/${id}`,
      {
        responseType: 'text'
      }
    );

  }

}
