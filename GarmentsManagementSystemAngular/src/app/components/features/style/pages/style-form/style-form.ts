import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StyleService } from '../../services/style.service';
import { StyleRequest } from '../../models/style-request';

@Component({
  selector: 'app-style-form',
   standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './style-form.html',
  styleUrl: './style-form.css',
})
export class StyleForm implements OnInit {

 loading = false;

  isEdit = false;

  styleId = 0;

  styleForm!: FormGroup;

  constructor(

    private fb: FormBuilder,

    private styleService: StyleService,

    private router: Router,

    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef

  ) { }

  ngOnInit(): void {

    this.initializeForm();

    this.checkEditMode();

  }

  // Initialize Form

  initializeForm(): void {

    this.styleForm = this.fb.group({

      styleCode: [
        '',
        Validators.required
      ],

      styleName: [
        '',
        Validators.required
      ],

      styleType: [
        '',
        Validators.required
      ],

      description: [''],

      approvalStatus: [
        '',
        Validators.required
      ],

      sizeSet: [
        '',
        Validators.required
      ]

    });

  }

  // Check Edit Mode

  checkEditMode(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {

      return;

    }

    this.isEdit = true;

    this.styleId = Number(id);

    this.loadStyle(this.styleId);

  }

  // Load Style

  loadStyle(id: number): void {

    this.loading = true;

    this.styleService.getById(id).subscribe({

      next: (style) => {

        this.styleForm.patchValue({

          styleCode: style.styleCode,

          styleName: style.styleName,

          styleType: style.styleType,

          description: style.description,

          approvalStatus: style.approvalStatus,

          sizeSet: style.sizeSet

        });

        this.loading = false;
        this.cdr.markForCheck();

      },

      error: (error) => {

        console.error(error);

        this.loading = false;

      }

    });

  }

  // Save

  saveStyle(): void {

    if (this.styleForm.invalid) {

      this.styleForm.markAllAsTouched();

      return;

    }

    const request: StyleRequest = this.styleForm.value;

    if (this.isEdit) {

      this.updateStyle(request);

    } else {

      this.createStyle(request);

    }

  }

  // Create

  createStyle(request: StyleRequest): void {

    this.styleService.create(request).subscribe({

      next: () => {

        alert('Style Created Successfully');

        this.router.navigate(['/styles']);

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

  // Update

  updateStyle(request: StyleRequest): void {

    this.styleService.update(this.styleId, request).subscribe({

      next: () => {

        alert('Style Updated Successfully');

        this.router.navigate(['/styles']);

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

  // Reset

  resetForm(): void {

    this.styleForm.reset();

  }
}
