import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ProfileUpdateRequest } from '../../models/profile-update-request';

@Component({
  selector: 'app-profile',
   standalone: true,
  imports: [CommonModule,ReactiveFormsModule, RouterModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit{

    form!: FormGroup;

  loading = false;

  saving = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private cdr: ChangeDetectorRef
    
  ) {}

  ngOnInit(): void {

    this.buildForm();

    this.loadProfile();

  }

  private buildForm(): void {

    this.form = this.fb.group({

      name: [
        '',
        Validators.required
      ],

      email: [
        {
          value: '',
          disabled: true
        }
      ],

      phone: [
        '',
        Validators.required
      ],

      role: [
        {
          value: '',
          disabled: true
        }
      ],

      active: [
        {
          value: false,
          disabled: true
        }
      ]

    });

  }

  private loadProfile(): void {

    this.loading = true;

    this.userService
      .getMyProfile()
      .subscribe({

        next: (res) => {

          this.form.patchValue({

            name: res.name,

            email: res.email,

            phone: res.phone,

            role: res.role,

            active: res.active

          });

          this.loading = false;
          this.cdr.markForCheck();

        },

        error: () => {

          this.loading = false;

        }

      });

  }

  save(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;

    }

    this.saving = true;

    const request: ProfileUpdateRequest = {

      name: this.form.get('name')?.value,

      phone: this.form.get('phone')?.value

    };

    this.userService
      .updateMyProfile(request)
      .subscribe({

        next: () => {

          this.saving = false;

          alert('Profile updated successfully.');

        },

        error: () => {

          this.saving = false;

        }

      });

  }



}
