import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,RouterModule],
  templateUrl: './item-form.html',
  styleUrl: './item-form.css',
})
export class ItemForm implements OnInit {

    itemForm!: FormGroup;

  loading = false;

  isEdit = false;

  itemId!: number;

  // ===========================
  // Category Dropdown
  // ===========================

  readonly categories = [

    'Fabric',

    'Accessories',

    'Packaging',

    'Thread',

    'Label',

    'Others'

  ];

  // ===========================
  // Unit Dropdown
  // ===========================

  readonly units = [

    'Yard',

    'Kg',

    'Piece',

    'Meter',

    'Cone',

    'Roll',

    'Box'

  ];

  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
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

      this.itemId = +id;

      this.loadItem(this.itemId);

    }
  }


   // ===========================
  // Create Form
  // ===========================

  createForm(): void {

    this.itemForm = this.fb.group({

      itemName: [
        '',
        Validators.required
      ],

      category: [
        '',
        Validators.required
      ],

      unit: [
        '',
        Validators.required
      ]

    });

  }

  // ===========================
  // Load Item
  // ===========================

  loadItem(id: number): void {

    this.loading = true;

    this.itemService
      .getById(id)
      .subscribe({

        next: response => {

          this.itemForm.patchValue({

            itemName: response.itemName,

            category: response.category,

            unit: response.unit

          });

          this.loading = false;
          this.cdr.detectChanges();

        },

        error: err => {

          console.error(err);

          this.loading = false;
          this.cdr.detectChanges();
        }

      });

  }

  // ===========================
  // Save
  // ===========================

  saveItem(): void {

    if (this.itemForm.invalid) {

      this.itemForm.markAllAsTouched();

      return;

    }

    if (this.isEdit) {

      this.itemService
        .update(
          this.itemId,
          this.itemForm.value
        )
        .subscribe(() => {

          alert('Item Updated Successfully');

          this.router.navigate(['/items']);

        });

    }

    else {

      this.itemService
        .create(this.itemForm.value)
        .subscribe(() => {

          alert('Item Saved Successfully');

          this.router.navigate(['/items']);

        });

    }

  }

  // ===========================
  // Reset
  // ===========================

  resetForm(): void {

    this.itemForm.reset();

  }





}
