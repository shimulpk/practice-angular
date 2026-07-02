import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BuyerResponse } from '../models/buyer-response';
import { BuyerRequest } from '../models/buyer-request';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BuyerService {


   private http = inject(HttpClient);

     private readonly apiUrl = `${environment.apiUrl}/buyers`;

      constructor() { }

    // Get All Buyer

     getAll(): Observable<BuyerResponse[]> {
    return this.http.get<BuyerResponse[]>(this.apiUrl);
  }

  // Get by Id buyer

   getById(id: number): Observable<BuyerResponse> {
    return this.http.get<BuyerResponse>(`${this.apiUrl}/${id}`);
  }


  // create new buyer
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
