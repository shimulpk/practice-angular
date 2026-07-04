import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StyleResponse } from '../../../style/models/style-response';
import { BomService } from '../../services/bom.service';
import { StyleService } from '../../../style/services/style.service';
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

  styles: StyleResponse[] = [];

  loading = false;

  isEdit = false;

  bomId = 0;

  constructor(

    private fb: FormBuilder,

    private bomService: BomService,

    private styleService: StyleService,

    private router: Router,

    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {

    this.initializeForm();
    this.loadStyles();
    this.checkEditMode();
  }

   // Form Initialize

  initializeForm(): void {

    this.bomForm = this.fb.group({

      serial: [
        '',
        Validators.required
      ],

      styleId: [
        '',
        Validators.required
      ],

      materialName: [
        '',
        Validators.required
      ],

      unit: [
        '',
        Validators.required
      ],

      baseFabric: [
        '',
        Validators.required
      ],

      quantity: [
        '',
        Validators.required
      ],

      unitPrice: [
        '',
        Validators.required
      ]

    });

  }

  // Load Style Dropdown

  loadStyles(): void {

    this.styleService.getAll().subscribe({

      next: (response) => {

        this.styles = response;

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

  // Check Edit Mode

  checkEditMode(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {

      return;

    }

    this.isEdit = true;

    this.bomId = Number(id);

    this.loadBom(this.bomId);

  }

  // Load BOM

  loadBom(id: number): void {

    this.loading = true;

    this.bomService.getById(id).subscribe({

      next: (bom) => {

        this.loading = false;

        this.bomForm.patchValue({

          serial: bom.serial,

          styleId: bom.styleId,

          materialName: bom.materialName,

          unit: bom.unit,

          baseFabric: bom.baseFabric,

          quantity: bom.quantity,

          unitPrice: bom.unitPrice

        });

      },

      error: (error) => {

        console.error(error);

        this.loading = false;

      }

    });

  }

  // Save

  saveBom(): void {

    if (this.bomForm.invalid) {

      this.bomForm.markAllAsTouched();

      return;

    }

    const request: BomRequest = this.bomForm.value;

    if (this.isEdit) {

      this.updateBom(request);

    } else {

      this.createBom(request);

    }

  }

  // Create

  createBom(request: BomRequest): void {

    this.bomService.create(request).subscribe({

      next: () => {

        alert('BOM Created Successfully');

        this.router.navigate(['/bom']);

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

  // Update

  updateBom(request: BomRequest): void {

    this.bomService.update(
      this.bomId,
      request
    ).subscribe({

      next: () => {

        alert('BOM Updated Successfully');

        this.router.navigate(['/bom']);

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

  // Reset

  resetForm(): void {

    this.bomForm.reset();

  }



}
