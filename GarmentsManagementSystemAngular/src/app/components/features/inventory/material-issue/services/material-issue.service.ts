import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MaterialIssueRequest } from '../models/material-issue-request';
import { Observable } from 'rxjs';
import { MaterialIssueResponse } from '../models/material-issue-response';
import { AvailableStock } from '../models/available-stock';

@Injectable({
  providedIn: 'root',
})
export class MaterialIssueService {


   private readonly apiUrl =
    `${environment.apiUrl}/material-issues`;

  private readonly stockApiUrl =
    `${environment.apiUrl}/stocks`;

  constructor(
    private http: HttpClient
  ) { }

  // ============================
  // Material Issue
  // ============================

  create(
    request: MaterialIssueRequest
  ): Observable<MaterialIssueResponse> {

    return this.http.post<MaterialIssueResponse>(
      this.apiUrl,
      request
    );

  }

  getAll(): Observable<MaterialIssueResponse[]> {

    return this.http.get<MaterialIssueResponse[]>(
      this.apiUrl
    );

  }

  getById(
    id: number
  ): Observable<MaterialIssueResponse> {

    return this.http.get<MaterialIssueResponse>(
      `${this.apiUrl}/${id}`
    );

  }

  // ============================
  // Available Stock
  // ============================

  getAvailableStocks(): Observable<AvailableStock[]> {

    return this.http.get<AvailableStock[]>(
      `${this.stockApiUrl}/available`
    );

  }
}
