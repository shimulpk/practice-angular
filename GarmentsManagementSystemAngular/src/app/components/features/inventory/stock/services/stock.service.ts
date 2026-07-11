import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockResponse } from '../models/stock-response';

@Injectable({
  providedIn: 'root',
})
export class StockService {

    private readonly apiUrl =
    `${environment.apiUrl}/stocks`;

  constructor(
    private http: HttpClient
  ) { }

  // ==========================
  // Get All Stocks
  // ==========================

  getAll(): Observable<StockResponse[]> {

    return this.http.get<StockResponse[]>(
      this.apiUrl
    );

  }

  // ==========================
  // Get Available Stocks
  // ==========================

  getAvailableStocks(): Observable<StockResponse[]> {

    return this.http.get<StockResponse[]>(
      `${this.apiUrl}/available`
    );

  }
}
