import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserRequest } from '../models/user-request';
import { UserResponse } from '../models/user-response';
import { Observable } from 'rxjs';
import { ProfileUpdateRequest } from '../models/profile-update-request';
import { ChangePasswordRequest } from '../models/change-password-request';

@Injectable({
  providedIn: 'root',
})
export class UserService {

   private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/users`;

  // Create User
  create(request: UserRequest): Observable<UserResponse> {

    return this.http.post<UserResponse>(
      this.apiUrl,
      request
    );

  }

  // Update User
  update(
    id: number,
    request: UserRequest
  ): Observable<UserResponse> {

    return this.http.put<UserResponse>(
      `${this.apiUrl}/${id}`,
      request
    );

  }

  // Get User By Id
  getById(id: number): Observable<UserResponse> {

    return this.http.get<UserResponse>(
      `${this.apiUrl}/${id}`
    );

  }

  // Get All Users
  getAll(): Observable<UserResponse[]> {

    return this.http.get<UserResponse[]>(
      this.apiUrl
    );

  }

  // Delete User
  delete(id: number): Observable<string> {

    return this.http.delete(
      `${this.apiUrl}/${id}`,
      {
        responseType: 'text'
      }
    );

  }

 // ===============================
// Profile
// ===============================

getMyProfile(): Observable<UserResponse> {

  return this.http.get<UserResponse>(
    `${this.apiUrl}/me`
  );

}

updateMyProfile(
  request: ProfileUpdateRequest
): Observable<UserResponse> {

  return this.http.put<UserResponse>(
    `${this.apiUrl}/me`,
    request
  );

}


changePassword(request: ChangePasswordRequest) {

  return this.http.put(
    `${this.apiUrl}/change-password`,
    request,
    {
      responseType: 'text'
    }
  );

}
}
