import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemResponse } from '../models/item-response';
import { ItemRequest } from '../models/item-request';

@Injectable({
  providedIn: 'root',
})
export class ItemService {

  private readonly apiUrl =
    `${environment.apiUrl}/items`;

  constructor(
    private http: HttpClient
  ) { }

  // ===========================
  // Get All
  // ===========================

  getAll(): Observable<ItemResponse[]> {

    return this.http.get<ItemResponse[]>(
      this.apiUrl
    );

  }

  // ===========================
  // Get By Id
  // ===========================

  getById(id: number): Observable<ItemResponse> {

    return this.http.get<ItemResponse>(
      `${this.apiUrl}/${id}`
    );

  }

  // ===========================
  // Create
  // ===========================

  create(
    request: ItemRequest
  ): Observable<ItemResponse> {

    return this.http.post<ItemResponse>(
      this.apiUrl,
      request
    );

  }

  // ===========================
  // Update
  // ===========================

  update(
    id: number,
    request: ItemRequest
  ): Observable<ItemResponse> {

    return this.http.put<ItemResponse>(
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
}
