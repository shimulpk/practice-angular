import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FabricCheckRequest } from '../models/fabric-check-request';
import { Observable } from 'rxjs';
import { FabricCheckResponse } from '../models/fabric-check-response';


@Injectable({
  providedIn: 'root',
})
export class FabricRecordService {

   private readonly apiUrl =
    `${environment.apiUrl}/fabric-check`;

  constructor(
    private http: HttpClient
  ) { }

  // ===========================
  // Generate Fabric Record
  // ===========================

  generate(
    request: FabricCheckRequest
  ): Observable<FabricCheckResponse> {

    return this.http.post<FabricCheckResponse>(
      `${this.apiUrl}/generate`,
      request
    );

  }

  // ===========================
  // Get All Fabric Records
  // ===========================

  getAll(): Observable<FabricCheckResponse[]> {

    return this.http.get<FabricCheckResponse[]>(
      this.apiUrl
    );

  }

  // ===========================
  // Get Fabric Record By Id
  // ===========================

  getById(
    id: number
  ): Observable<FabricCheckResponse> {

    return this.http.get<FabricCheckResponse>(
      `${this.apiUrl}/${id}`
    );

  }

  // ===========================
  // Delete Fabric Record
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
