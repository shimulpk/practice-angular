import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { BomService } from '../../services/bom.service';

import { BomRequest } from '../../models/bom-request';

@Component({
  selector: 'app-bom-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './bom-form.html',
  styleUrl: './bom-form.css',
})
export class BomForm implements OnInit{

     bomForm!: FormGroup;

  loading = false;

  isEdit = false;

  bomId = 0;

  styleId = 0;

  constructor(

    private fb: FormBuilder,

    private bomService: BomService,

    private router: Router,

    private route: ActivatedRoute,

    private cdr: ChangeDetectorRef

  ) { }

  ngOnInit(): void {

    this.styleId = Number(
      this.route.snapshot.paramMap.get('styleId')
    );

    this.initializeForm();

    this.checkEditMode();

  }

  // ===========================
  // Form Initialize
  // ===========================

  initializeForm(): void {

    this.bomForm = this.fb.group({

      serial: ['', Validators.required],

      materialName: ['', Validators.required],

      unit: ['', Validators.required],

      baseFabric: ['',],

      quantity: [0, Validators.required],

      unitPrice: [0, Validators.required]

    });

  }

  // ===========================
  // Edit Mode
  // ===========================

  checkEditMode(): void {

    const id =
      this.route.snapshot.paramMap.get('id');

      console.log(id+'++++++++++++++++++++++++++++++++++++++')

    if (!id) {

      return;

    }

    this.isEdit = true;

    this.bomId = Number(id);

    this.loadBom(this.bomId);
    console.log(this.loadBom(this.bomId));

  }

  // ===========================
  // Load BOM
  // ===========================

  loadBom(id: number): void {

    this.loading = true;

    this.bomService.getById(id)
      .subscribe({

        next: (bom) => {

          this.loading = false;

          console.log(bom);

          this.styleId = bom.styleId;

          this.bomForm.patchValue({

            serial: bom.serial,

            materialName: bom.materialName,

            unit: bom.unit,

            baseFabric: bom.baseFabric,

            quantity: bom.quantity,

            unitPrice: bom.unitPrice

          });

          this.cdr.markForCheck();

        },

        error: (error) => {

          console.error(error);

          this.loading = false;

        }

      });

  }

  // ===========================
  // Save
  // ===========================

  saveBom(): void {

    if (this.bomForm.invalid) {

      this.bomForm.markAllAsTouched();

      return;

    }

    const request: BomRequest = {

      ...this.bomForm.value,

      styleId: this.styleId

    };

    if (this.isEdit) {

      this.updateBom(request);

    }

    else {

      this.createBom(request);

    }

  }

  // ===========================
  // Create
  // ===========================

  createBom(request: BomRequest): void {

    this.bomService.create(request)
      .subscribe({

        next: () => {

          alert('BOM Item Added Successfully');

          this.router.navigate([
            '/bom/style',
            this.styleId
          ]);

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

  // ===========================
  // Update
  // ===========================

  updateBom(request: BomRequest): void {

    this.bomService.update(
      this.bomId,
      request
    ).subscribe({

      next: () => {

        alert('BOM Item Updated Successfully');

        this.router.navigate([
          '/bom/style',
          this.styleId
        ]);

      

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

  // ===========================
  // Reset
  // ===========================

  resetForm(): void {

    this.bomForm.reset({

      quantity: 0,

      unitPrice: 0

    });

  }


}
