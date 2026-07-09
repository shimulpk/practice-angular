import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StoreRequisitionResponse } from '../../../inventory/store-requisition/models/store-requisition-response';

@Injectable({
  providedIn: 'root',
})
export class PendingStoreRequisitionService {


  private readonly apiUrl =
    `${environment.apiUrl}/store-requisitions`;

  constructor(
    private http: HttpClient
  ) { }

  // ===========================
  // Get Pending Requisitions
  // ===========================

  getPending(): Observable<StoreRequisitionResponse[]> {

    return this.http.get<StoreRequisitionResponse[]>(
      `${this.apiUrl}/pending`
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
  // Approve
  // ===========================

  approve(id: number): Observable<StoreRequisitionResponse> {

    return this.http.put<StoreRequisitionResponse>(
      `${this.apiUrl}/${id}/approve`,
      {}
    );

  }

  // ===========================
  // Reject
  // ===========================

  reject(id: number): Observable<StoreRequisitionResponse> {

    return this.http.put<StoreRequisitionResponse>(
      `${this.apiUrl}/${id}/reject`,
      {}
    );

  }
}
