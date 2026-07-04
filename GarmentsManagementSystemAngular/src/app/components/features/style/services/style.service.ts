import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StyleResponse } from '../models/style-response';
import { StyleRequest } from '../models/style-request';

@Injectable({
  providedIn: 'root',
})
export class StyleService {

   private readonly apiUrl = `${environment.apiUrl}/styles`;

  constructor(
    private http: HttpClient
  ) { }

  // Get All Styles

  getAll(): Observable<StyleResponse[]> {

    return this.http.get<StyleResponse[]>(this.apiUrl);

  }

  // Get Style By Id

  getById(id: number): Observable<StyleResponse> {

    return this.http.get<StyleResponse>(
      `${this.apiUrl}/${id}`
    );

  }

  // Create Style

  create(request: StyleRequest): Observable<StyleResponse> {

    return this.http.post<StyleResponse>(
      this.apiUrl,
      request
    );

  }

  // Update Style

  update(
    id: number,
    request: StyleRequest
  ): Observable<StyleResponse> {

    return this.http.put<StyleResponse>(
      `${this.apiUrl}/${id}`,
      request
    );

  }

  // Delete Style

  delete(id: number): Observable<string> {

    return this.http.delete(
      `${this.apiUrl}/${id}`,
      {
        responseType: 'text'
      }
    );

  }
}
