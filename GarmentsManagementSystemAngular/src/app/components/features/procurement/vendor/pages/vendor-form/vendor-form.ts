import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { VendorService } from '../../services/vendor.service';
import { VendorRequest } from '../../models/vendor-request';

@Component({
  selector: 'app-vendor-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterModule],
  templateUrl: './vendor-form.html',
  styleUrl: './vendor-form.css',
})
export class VendorForm implements OnInit{

   vendorForm!: FormGroup;

  loading = false;

  isEdit = false;

  vendorId!: number;

  constructor(
    private fb: FormBuilder,
    private vendorService: VendorService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
     this.createForm();

    const id =
      this.route.snapshot.paramMap.get('id');

    if (id) {

      this.isEdit = true;

      this.vendorId = +id;

      this.loadVendor(this.vendorId);

    }

  }


    // ===========================
  // Create Form
  // ===========================

  createForm(): void {

    this.vendorForm = this.fb.group({

      companyName: ['', Validators.required],

      contactPerson: ['', Validators.required],

      phone: ['', Validators.required],

      address: ['', Validators.required]

    });

  }

  // ===========================
  // Load Vendor
  // ===========================

  loadVendor(id: number): void {

    this.loading = true;

    this.vendorService
      .getById(id)
      .subscribe({

        next: (response) => {

          this.vendorForm.patchValue({

            companyName: response.companyName,

            contactPerson: response.contactPerson,

            phone: response.phone,

            address: response.address

          });

          this.loading = false;
          this.cdr.detectChanges();

        },

        error: (err) => {

          console.error(err);

          this.loading = false;
          
          this.cdr.detectChanges();
        }

      });

  }

  // ===========================
  // Save Vendor
  // ===========================

  saveVendor(): void {

    if (this.vendorForm.invalid) {

      this.vendorForm.markAllAsTouched();

      return;

    }

    const request: VendorRequest =
      this.vendorForm.value;

    if (this.isEdit) {

      this.vendorService
        .update(this.vendorId, request)
        .subscribe({

          next: () => {

            alert('Vendor Updated Successfully');

            this.router.navigate(['/vendors']);

          },

          error: err => console.error(err)

        });

    }

    else {

      this.vendorService
        .create(request)
        .subscribe({

          next: () => {

            alert('Vendor Saved Successfully');

            this.router.navigate(['/vendors']);

          },

          error: err => console.error(err)

        });

    }

  }

  // ===========================
  // Reset
  // ===========================

  resetForm(): void {

    this.vendorForm.reset();

  }





}
