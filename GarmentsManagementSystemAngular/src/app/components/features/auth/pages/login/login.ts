import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginRequest } from '../../authmodels/auth.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
    standalone:true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {


  dto: LoginRequest = { email: '', password: '' };

  showPassword = false;
  loading = false;
  errorMessage: string | null = null;

  constructor(private auth: AuthService,
     private router: Router,
     private cdr:ChangeDetectorRef
    ) { }


  login(): void {
    this.loading = true;
    this.errorMessage = null;

    this.auth.login(this.dto).subscribe({
      next: () => {
        this.loading = false;
       this.router.navigate(['/dashboard']);

        this.cdr.markForCheck();
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage =
          err.status === 401
            ? 'Invalid email or password.'
            : err.status === 403
              ? 'Your account is not verified or has been disabled.'
              : 'Something went wrong. Please try again.';
      }
    });
  }

}
