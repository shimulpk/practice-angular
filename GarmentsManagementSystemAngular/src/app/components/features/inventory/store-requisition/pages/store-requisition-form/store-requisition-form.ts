import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ItemResponse } from '../../../item/models/item-response';
import { StoreRequisitionService } from '../../services/store-requisition.service';
import { ItemService } from '../../../item/services/item.service';

@Component({
  selector: 'app-store-requisition-form',
    standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './store-requisition-form.html',
  styleUrl: './store-requisition-form.css',
})
export class StoreRequisitionForm implements OnInit{

   storeRequisitionForm!: FormGroup;

  items: ItemResponse[] = [];

  loading = false;

  isEdit = false;

  requisitionId!: number;

  constructor(
    private fb: FormBuilder,
    private storeRequisitionService: StoreRequisitionService,
    private itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
   this.createForm();

    this.loadItems();

    const id =
      this.route.snapshot.paramMap.get('id');

    if (id) {

      this.isEdit = true;

      this.requisitionId = +id;

      this.loadStoreRequisition(this.requisitionId);

    }
  }

   // ====================================
  // Create Form
  // ====================================

  createForm(): void {

    this.storeRequisitionForm =
      this.fb.group({

        requisitionDate: [
          '',
          Validators.required
        ],

        requestedBy: [
          '',
          Validators.required
        ],

        department: [
          '',
          Validators.required
        ],

        remarks: [''],

        items:
          this.fb.array([])

      });

    this.addItem();

  }

  // ====================================
  // FormArray
  // ====================================

  get itemForms(): FormArray {

    return this.storeRequisitionForm.get(
      'items'
    ) as FormArray;

  }

  // ====================================
  // Add Item Row
  // ====================================

  addItem(): void {

    this.itemForms.push(

      this.fb.group({

        itemId: [
          null,
          Validators.required
        ],

        unit: [
          {
            value: '',
            disabled: true
          }
        ],

        quantity: [
          null,
          [
            Validators.required,
            Validators.min(1)
          ]
        ],

        // remarks: ['']

      })

    );

  }

  // ====================================
  // Remove Item
  // ====================================

  removeItem(index: number): void {

    if (this.itemForms.length === 1) {

      return;

    }

    this.itemForms.removeAt(index);

  }

  // ====================================
  // Load Item Dropdown
  // ====================================

  loadItems(): void {

    this.itemService
      .getAll()
      .subscribe({

        next: (response) => {

          this.items = response;

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

  // ====================================
// Load Store Requisition
// ====================================

loadStoreRequisition(id: number): void {

  this.loading = true;

  this.storeRequisitionService
    .getById(id)
    .subscribe({

      next: (response) => {

        this.itemForms.clear();

        this.storeRequisitionForm.patchValue({

          requisitionDate: response.requisitionDate,

          requestedBy: response.requestedBy,

          department: response.department,

          remarks: response.remarks

        });

        response.items.forEach(item => {

          const group = this.fb.group({

            itemId: [
              item.itemId,
              Validators.required
            ],

            unit: [
              {
                value: item.unit,
                disabled: true
              }
            ],

            quantity: [
              item.quantity,
              [
                Validators.required,
                Validators.min(1)
              ]
            ],

            // remarks: [
            //   item.remarks
            // ]

          });

          this.itemForms.push(group);

        });

        this.loading = false;

      },

      error: err => {

        console.error(err);

        this.loading = false;

      }

    });

}

// ====================================
// Item Change
// ====================================

onItemChange(index: number): void {

  const row =
    this.itemForms.at(index);

  const itemId =
    row.get('itemId')?.value;

  const item =
    this.items.find(
      x => x.id == itemId
    );

  if (!item) {

    row.get('unit')
      ?.setValue('');

    return;

  }

  row.get('unit')
    ?.setValue(item.unit);

}

// ====================================
// Build Request
// ====================================

private buildRequest(): any {

  const form =
    this.storeRequisitionForm.getRawValue();

  return {

    requisitionDate:
      form.requisitionDate,

    requestedBy:
      form.requestedBy,

    department:
      form.department,

    remarks:
      form.remarks,

    items:
      form.items.map(
        (x: any) => ({

          itemId:
            x.itemId,

          quantity:
            x.quantity,

          // remarks:
          //   x.remarks

        })
      )

  };

}

// ====================================
// Save
// ====================================

saveStoreRequisition(): void {

  if (
    this.storeRequisitionForm.invalid
  ) {

    this.storeRequisitionForm
      .markAllAsTouched();

    return;

  }

  const request =
    this.buildRequest();

  if (this.isEdit) {

    this.storeRequisitionService
      .update(
        this.requisitionId,
        request
      )
      .subscribe(() => {

        alert(
          'Store Requisition Updated Successfully'
        );

        this.router.navigate([
          '/store-requisition'
        ]);

      });

  }

  else {

    this.storeRequisitionService
      .create(request)
      .subscribe(() => {

        alert(
          'Store Requisition Saved Successfully'
        );

        this.router.navigate([
          '/store-requisition'
        ]);

      });

  }

}

// ====================================
// Reset
// ====================================

resetForm(): void {

  this.storeRequisitionForm.reset();

  this.itemForms.clear();

  this.addItem();

}


}
