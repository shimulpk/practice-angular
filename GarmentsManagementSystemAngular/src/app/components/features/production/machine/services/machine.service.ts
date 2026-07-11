import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MachineRequest } from '../models/machine-request';
import { Observable } from 'rxjs';
import { MachineResponse } from '../models/machine-response';

@Injectable({
  providedIn: 'root',
})
export class MachineService {

   private readonly apiUrl =
    `${environment.apiUrl}/machines`;

  constructor(
    private http: HttpClient
  ) { }

  // ==========================
  // Create
  // ==========================

  create(
    request: MachineRequest
  ): Observable<MachineResponse> {

    return this.http.post<MachineResponse>(
      this.apiUrl,
      request
    );

  }

  // ==========================
  // Update
  // ==========================

  update(
    id: number,
    request: MachineRequest
  ): Observable<MachineResponse> {

    return this.http.put<MachineResponse>(
      `${this.apiUrl}/${id}`,
      request
    );

  }

  // ==========================
  // Get By Id
  // ==========================

  getById(
    id: number
  ): Observable<MachineResponse> {

    return this.http.get<MachineResponse>(
      `${this.apiUrl}/${id}`
    );

  }

  // ==========================
  // Get All
  // ==========================

  getAll(): Observable<MachineResponse[]> {

    return this.http.get<MachineResponse[]>(
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
