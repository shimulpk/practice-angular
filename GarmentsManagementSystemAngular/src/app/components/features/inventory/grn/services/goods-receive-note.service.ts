import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { GoodsReceiveNoteRequest } from '../models/goods-receive-note-request';
import { Observable } from 'rxjs';
import { GoodsReceiveNoteResponse } from '../models/goods-receive-note-response';

@Injectable({
  providedIn: 'root',
})
export class GoodsReceiveNoteService {


    private apiUrl =
    `${environment.apiUrl}/grns`;

  constructor(
    private http: HttpClient
  ) { }

  // =====================================
  // Create GRN
  // =====================================

  create(
    request: GoodsReceiveNoteRequest
  ): Observable<GoodsReceiveNoteResponse> {

    return this.http.post<GoodsReceiveNoteResponse>(
      this.apiUrl,
      request
    );

  }

  // =====================================
  // Get All GRNs
  // =====================================

  getAll(): Observable<GoodsReceiveNoteResponse[]> {

    return this.http.get<GoodsReceiveNoteResponse[]>(
      this.apiUrl
    );

  }

  // =====================================
  // Get GRN By Id
  // =====================================

  getById(
    id: number
  ): Observable<GoodsReceiveNoteResponse> {

    return this.http.get<GoodsReceiveNoteResponse>(
      `${this.apiUrl}/${id}`
    );

  }

}
