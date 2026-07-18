import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Role } from '../../models/role';
import { UserService } from '../../services/user.service';
import { UserRequest } from '../../models/user-request';

@Component({
  selector: 'app-user-registration',
   standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './user-registration.html',
  styleUrl: './user-registration.css',
})
export class UserRegistration implements OnInit{

 form!: FormGroup;

  editMode = false;

  id = 0;


  roles = Object.values(Role);
  loading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.buildForm();

    this.id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (this.id) {

      this.editMode = true;

      this.loadUser();

    }

  }

  buildForm(): void {

    this.form = this.fb.group({

      name: [
        '',
        Validators.required
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      phone: [
        '',
        Validators.required
      ],

      password: [
        '',
        Validators.required
      ],

      role: [
        '',
        Validators.required
      ],

      active: [
        true
      ]

    });

  }

  loadUser(): void {

    this.loading = true;

    this.userService
      .getById(this.id)
      .subscribe({

        next: (res) => {

          this.form.patchValue({

            name: res.name,
            email: res.email,
            phone: res.phone,
            role: res.role,
            active: res.active

          });

          this.cdr.markForCheck();

          // Edit mode-e Password khali thakbe
          this.form.patchValue({
            password: ''
          });

          this.loading = false;

        },

        error: () => {

          this.loading = false;

        }

      });

  }

  submit(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;

    }

    const request: UserRequest = this.form.value;

    if (this.editMode) {

      this.userService
        .update(this.id, request)
        .subscribe(() => {

          this.router.navigate(['/users']);

        });

    }

    else {

      this.userService
        .create(request)
        .subscribe(() => {

          this.router.navigate(['/users']);

        });

    }

  }

  resetForm(): void {

    this.form.reset({

      active: true

    });

  }

}
