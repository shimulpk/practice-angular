import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StoreRequisitionResponse } from '../models/store-requisition-response';
import { StoreRequisitionRequest } from '../models/store-requisition-request';

@Injectable({
  providedIn: 'root',
})
export class StoreRequisitionService {


   private readonly apiUrl =
    `${environment.apiUrl}/store-requisitions`;

  constructor(
    private http: HttpClient
  ) { }

  // ===========================
  // Get All
  // ===========================

  getAll(): Observable<StoreRequisitionResponse[]> {

    return this.http.get<StoreRequisitionResponse[]>(
      this.apiUrl
    );

  }

  // ===========================
  // Get By Id
  // ===========================

  getById(id: number): Observable<StoreRequisitionResponse> {

    return this.http.get<StoreRequisitionResponse>(
      `${this.apiUrl}/${id}`
    );

  }

  // ===========================
  // Create
  // ===========================

  create(
    request: StoreRequisitionRequest
  ): Observable<StoreRequisitionResponse> {

    return this.http.post<StoreRequisitionResponse>(
      this.apiUrl,
      request
    );

  }

  // ===========================
  // Update
  // ===========================

  update(
    id: number,
    request: StoreRequisitionRequest
  ): Observable<StoreRequisitionResponse> {

    return this.http.put<StoreRequisitionResponse>(
      `${this.apiUrl}/${id}`,
      request
    );

  }

  // ===========================
  // Delete
  // ===========================

  delete(id: number): Observable<string> {

    return this.http.delete(
      `${this.apiUrl}/${id}`,
      {
        responseType: 'text'
      }
    );

  }

  getApprovedRequisitions(): Observable<StoreRequisitionResponse[]> {

  return this.http.get<StoreRequisitionResponse[]>(
    `${this.apiUrl}/approved`
  );

}

}
