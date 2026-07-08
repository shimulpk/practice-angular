import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VendorResponse } from '../models/vendor-response';
import { VendorRequest } from '../models/vendor-request';

@Injectable({
  providedIn: 'root',
})
export class VendorService {

   private readonly apiUrl =
    `${environment.apiUrl}/vendors`;

  constructor(
    private http: HttpClient
  ) { }

  // ===========================
  // Get All Vendors
  // ===========================

  getAll(): Observable<VendorResponse[]> {

    return this.http.get<VendorResponse[]>(
      this.apiUrl
    );

  }

  // ===========================
  // Get Vendor By Id
  // ===========================

  getById(id: number): Observable<VendorResponse> {

    return this.http.get<VendorResponse>(
      `${this.apiUrl}/${id}`
    );

  }

  // ===========================
  // Create Vendor
  // ===========================

  create(
    request: VendorRequest
  ): Observable<VendorResponse> {

    return this.http.post<VendorResponse>(
      this.apiUrl,
      request
    );

  }

  // ===========================
  // Update Vendor
  // ===========================

  update(
    id: number,
    request: VendorRequest
  ): Observable<VendorResponse> {

    return this.http.put<VendorResponse>(
      `${this.apiUrl}/${id}`,
      request
    );

  }

  // ===========================
  // Delete Vendor
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
