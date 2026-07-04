import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UomService } from '../../services/uom.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UomRequest } from '../../models/uom-request';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-uom-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './uom-form.html',
  styleUrl: './uom-form.css',
})
export class UomForm implements OnInit{

   loading = false;

  isEdit = false;

  uomId = 0;

  uomForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private uomService: UomService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.initializeForm();

    this.checkEditMode();

  }

  // ==========================
  // Initialize Form
  // ==========================

  initializeForm(): void {

    this.uomForm = this.fb.group({

      productName: ['', Validators.required],

      size: ['', Validators.required],

      body: [0, [Validators.required, Validators.min(0)]],

      sleeve: [0, [Validators.required, Validators.min(0)]],

      pocket: [0, [Validators.required, Validators.min(0)]],

      wastage: [0, [Validators.required, Validators.min(0)]],

      shrinkage: [0, [Validators.required, Validators.min(0)]]

    });

  }

  // ==========================
  // Check Edit Mode
  // ==========================

  checkEditMode(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    this.isEdit = true;

    this.uomId = Number(id);

    this.loadUom(this.uomId);

  }

  // ==========================
  // Load UOM
  // ==========================

  loadUom(id: number): void {

    this.loading = true;

    this.uomService.getById(id).subscribe({

      next: (uom) => {

        this.uomForm.patchValue({

          productName: uom.productName,
          size: uom.size,
          body: uom.body,
          sleeve: uom.sleeve,
          pocket: uom.pocket,
          wastage: uom.wastage,
          shrinkage: uom.shrinkage

        });

        this.loading = false;
        this.cdr.detectChanges();

      },

      error: error => {

        console.error(error);

        this.loading = false;

      }

    });

  }

  // ==========================
  // Save
  // ==========================

  saveUom(): void {

    if (this.uomForm.invalid) {

      this.uomForm.markAllAsTouched();

      return;

    }

    const request: UomRequest = this.uomForm.value;

    if (this.isEdit) {

      this.updateUom(request);

    } else {

      this.createUom(request);

    }

  }

  // ==========================
  // Create
  // ==========================

  createUom(request: UomRequest): void {

    this.uomService.create(request).subscribe({

      next: () => {

        alert('UOM Created Successfully');

        this.router.navigate(['/uoms']);

      },

      error: error => {

        console.error(error);

      }

    });

  }

  // ==========================
  // Update
  // ==========================

  updateUom(request: UomRequest): void {

    this.uomService.update(this.uomId, request).subscribe({

      next: () => {

        alert('UOM Updated Successfully');

        this.router.navigate(['/uoms']);

      },

      error: error => {

        console.error(error);

      }

    });

  }

  // ==========================
  // Reset
  // ==========================

  resetForm(): void {

    this.uomForm.reset({

      productName: '',
      size: '',
      body: 0,
      sleeve: 0,
      pocket: 0,
      wastage: 0,
      shrinkage: 0

    });

  }
}
