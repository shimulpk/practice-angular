import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PurchaseOrderResponse } from '../../../../procurement/purchase-order/models/purchase-order-response';
import { GoodsReceiveNoteService } from '../../services/goods-receive-note.service';
import { PurchaseOrderService } from '../../../../procurement/purchase-order/services/purchase-order.service';
import { GoodsReceiveNoteRequest } from '../../models/goods-receive-note-request';

@Component({
  selector: 'app-grn-form',
   standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './grn-form.html',
  styleUrl: './grn-form.css',
})
export class GrnForm implements OnInit{

    form!: FormGroup;

  purchaseOrders: PurchaseOrderResponse[] = [];

  selectedPurchaseOrder?: PurchaseOrderResponse;

  loading = false;

  saving = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private grnService: GoodsReceiveNoteService,
    private purchaseOrderService: PurchaseOrderService,
    private cdr:ChangeDetectorRef
  ) { }


  ngOnInit(): void {
   
    this.initializeForm();

    this.loadPendingPurchaseOrders();

  }


   // =====================================
  // Initialize Form
  // =====================================

  initializeForm(): void {

    this.form = this.fb.group({

      grnDate: [
        new Date().toISOString().substring(0, 10),
        Validators.required
      ],

      purchaseOrderId: [
        '',
        Validators.required
      ],

      challanNo: [
        '',
        Validators.required
      ],

      remarks: [
        ''
      ]

    });

  }

   // =====================================
  // Load Pending Purchase Orders
  // =====================================

  loadPendingPurchaseOrders(): void {

    this.loading = true;

    this.purchaseOrderService
      .getPendingPurchaseOrders()
      .subscribe({

        next: (response) => {

          this.purchaseOrders = response;

          this.loading = false;
          this.cdr.markForCheck();

        },

        error: (error) => {

          console.error(error);

          this.loading = false;

        }

      });

  }

  // =====================================
  // Purchase Order Change
  // =====================================

  onPurchaseOrderChange(): void {

    const purchaseOrderId =
      Number(this.form.get('purchaseOrderId')?.value);

    this.selectedPurchaseOrder =
      this.purchaseOrders.find(
        po => po.id === purchaseOrderId
      );

  }

  // =====================================
  // Get Selected Purchase Order Items
  // =====================================

  get items() {

    return this.selectedPurchaseOrder?.items ?? [];

  }

  // =====================================
  // Save GRN
  // =====================================

  save(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;

    }

    this.saving = true;

    const request: GoodsReceiveNoteRequest = this.form.value;

    this.grnService.create(request).subscribe({

      next: () => {

        alert('Goods Receive Note created successfully.');

        this.router.navigate(['/inventory/grn']);

      },

      error: (error) => {

        console.error(error);

        alert(error.error?.message ?? 'Failed to create GRN.');

        this.saving = false;

      }

    });

  }

  // =====================================
  // Reset Form
  // =====================================

  reset(): void {

    this.form.reset({

      grnDate: new Date().toISOString().substring(0, 10),

      purchaseOrderId: '',

      challanNo: '',

      remarks: ''

    });

    this.selectedPurchaseOrder = undefined;

  }

  // =====================================
  // Cancel
  // =====================================

  cancel(): void {

    this.router.navigate(['/inventory/grn']);

  }

  // =====================================
  // Getters
  // =====================================

  get f() {

    return this.form.controls;

  }
}
