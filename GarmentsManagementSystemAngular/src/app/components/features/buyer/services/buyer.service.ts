import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { BuyerResponse } from '../models/buyer-response';
import { BuyerRequest } from '../models/buyer-request';

@Injectable({
  providedIn: 'root',
})
export class BuyerService {

  private http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/buyers`;

   constructor() { }

  //  get all buyer
    getAll(): Observable<BuyerResponse[]> {
    return this.http.get<BuyerResponse[]>(this.apiUrl);
  }


  // get by buyer id
  getById(id: number): Observable<BuyerResponse> {
    return this.http.get<BuyerResponse>(`${this.apiUrl}/${id}`);
  }


  // creaTE Buyer
   create(request: BuyerRequest): Observable<BuyerResponse> {
    return this.http.post<BuyerResponse>(this.apiUrl, request);
  }


  // update buyer
   update(id: number, request: BuyerRequest): Observable<BuyerResponse> {
    return this.http.put<BuyerResponse>(
      `${this.apiUrl}/${id}`,
      request
    );
  }


  // Delete buyer
   delete(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      responseType: 'text'
    });
  }


}
