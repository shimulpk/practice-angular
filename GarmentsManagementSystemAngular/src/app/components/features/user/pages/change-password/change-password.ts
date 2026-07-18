import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ChangePasswordRequest } from '../../models/change-password-request';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-change-password',
   standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css',
})
export class ChangePassword {


    dto: ChangePasswordRequest = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  loading = false;

  successMessage = '';

  errorMessage = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  get passwordMismatch(): boolean {

    return this.dto.confirmPassword.length > 0 &&
      this.dto.newPassword !== this.dto.confirmPassword;

  }

  submit(): void {

    if (this.passwordMismatch) {
      return;
    }

    this.loading = true;

    this.successMessage = '';

    this.errorMessage = '';

    this.userService.changePassword(this.dto)
      .subscribe({

        next: (message) => {

          this.loading = false;

          this.successMessage = message;

          this.dto = {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          };

          setTimeout(() => {

            this.router.navigate(['/dashboard']);

          }, 1500);

        },

        error: (err) => {

          this.loading = false;

          this.errorMessage =
            err.error || 'Failed to change password.';

        }

      });

  }

}
