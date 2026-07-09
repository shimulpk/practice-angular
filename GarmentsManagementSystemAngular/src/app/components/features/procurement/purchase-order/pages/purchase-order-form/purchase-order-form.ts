import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { VendorResponse } from '../../../vendor/models/vendor-response';
import { StoreRequisitionResponse } from '../../../../inventory/store-requisition/models/store-requisition-response';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { VendorService } from '../../../vendor/services/vendor.service';
import { StoreRequisitionService } from '../../../../inventory/store-requisition/services/store-requisition.service';

@Component({
  selector: 'app-purchase-order-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './purchase-order-form.html',
  styleUrl: './purchase-order-form.css',
})
export class PurchaseOrderForm implements OnInit {

  purchaseOrderForm!: FormGroup;

  vendors: VendorResponse[] = [];

  requisitions: StoreRequisitionResponse[] = [];

  items: any[] = [];

  loading = false;

  isEdit = false;

  purchaseOrderId!: number;

  constructor(
    private fb: FormBuilder,
    private purchaseOrderService: PurchaseOrderService,
    private vendorService: VendorService,
    private storeRequisitionService: StoreRequisitionService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.createForm();

    this.loadVendors();

    this.loadApprovedRequisitions();

    this.purchaseOrderForm
      .get('storeRequisitionId')
      ?.valueChanges
      .subscribe(id => {

        this.onRequisitionChange(id);

      });

    const id =
      this.route.snapshot.paramMap.get('id');

    if (id) {

      this.isEdit = true;

      this.purchaseOrderId = +id;

      this.loadPurchaseOrder(this.purchaseOrderId);

    }

  }

  // =====================================
  // Create Form
  // =====================================

  createForm(): void {

    this.purchaseOrderForm = this.fb.group({

      poDate: [new Date().toISOString().substring(0, 10), Validators.required],

      vendorId: [null, Validators.required],

      storeRequisitionId: [null, Validators.required],

      remarks: ['']

    });

  }

  // =====================================
  // Load Vendors
  // =====================================

  loadVendors(): void {

    this.vendorService
      .getAll()
      .subscribe({

        next: (data) => {

          this.vendors = data;

          this.cdr.detectChanges();

        },

        error: err => {

          console.error(err);

        }

      });

  }

  // =====================================
  // Load Approved Requisitions
  // =====================================

  loadApprovedRequisitions(): void {

    this.storeRequisitionService
      .getApprovedRequisitions()
      .subscribe({

        next: (data) => {

          this.requisitions = data;

          this.cdr.detectChanges();

        },

        error: err => {

          console.error(err);

        }

      });

  }


  // =====================================
  // Requisition Change
  // =====================================

  onRequisitionChange(id: number): void {

    const requisition =
      this.requisitions.find(r => r.id == id);

    if (!requisition) {

      this.items = [];

      return;

    }

    this.items =
      requisition.items.map(item => ({

        itemId: item.itemId,

        itemName: item.itemName,

        unit: item.unit,

        quantity: item.quantity,

        unitPrice: 0,

        lineTotal: 0

      }));

    this.cdr.detectChanges();

  }


  // =====================================
  // Load Purchase Order
  // =====================================

  loadPurchaseOrder(id: number): void {

    this.loading = true;

    this.purchaseOrderService
      .getById(id)
      .subscribe({

        next: (response) => {

          this.purchaseOrderForm.patchValue({

            poDate: response.poDate,

            vendorId: response.vendorId,

            storeRequisitionId:
              response.storeRequisitionId,

            remarks: response.remarks

          });

          this.items =
            response.items.map(item => ({

              itemId: item.itemId,

              itemName: item.itemName,

              unit: item.unit,

              quantity: item.quantity,

              unitPrice: item.unitPrice,

              lineTotal: item.lineTotal

            }));

          this.loading = false;

          this.cdr.detectChanges();

        },

        error: err => {

          console.error(err);

          this.loading = false;

        }

      });

  }


  // =====================================
  // Build Request
  // =====================================

  private buildRequest(): any {

    return {

      poDate:
        this.purchaseOrderForm.value.poDate,

      vendorId:
        this.purchaseOrderForm.value.vendorId,

      storeRequisitionId:
        this.purchaseOrderForm.value.storeRequisitionId,

      remarks:
        this.purchaseOrderForm.value.remarks,

      items:
        this.items.map(item => ({

          itemId: item.itemId,

          unitPrice: item.unitPrice

        }))

    };

  }


  // =====================================
  // Save Purchase Order
  // =====================================

  savePurchaseOrder(): void {

    if (this.purchaseOrderForm.invalid) {

      this.purchaseOrderForm.markAllAsTouched();

      return;

    }

    const request =
      this.buildRequest();

    if (this.isEdit) {

      this.purchaseOrderService
        .update(
          this.purchaseOrderId,
          request
        )

        .subscribe({

          next: (res:any) => {
            alert(
              'Purchase Order Updated Successfully'
            );

            

          const idToNavigate = res?.id || this.purchaseOrderId;
          this.router.navigate(['/purchase-orders/view', idToNavigate]);

          },

          error: (err)=>{
           console.error('Update Error:', err);
          alert('Failed to update Purchase Order');
          }

        });
      

    }

    else {

     this.purchaseOrderService
      .create(request)
      .subscribe({
        next: (res: any) => {
          alert('Purchase Order Created Successfully');
          
        
          if (res && res.id) {
            this.router.navigate(['/purchase-orders/view', res.id]);
          } else {
            
            this.router.navigate(['/purchase-orders']); 
          }
        },
        error: (err) => {
          console.error('Create Error:', err);
          alert('Failed to create Purchase Order');
        }
      });
    }
  }

  // =====================================
  // Reset Form
  // =====================================

  resetForm(): void {

    this.purchaseOrderForm.reset();

    this.items = [];

  }

  // =====================================
  // Calculate Line Total
  // =====================================

  getLineTotal(item: any): number {

    item.lineTotal =
      (Number(item.quantity) || 0)
      *
      (Number(item.unitPrice) || 0);

    return item.lineTotal;

  }

  // =====================================
  // Calculate Grand Total
  // =====================================

  getGrandTotal(): number {

    let total = 0;

    this.items.forEach(item => {

      total +=
        (Number(item.quantity) || 0)
        *
        (Number(item.unitPrice) || 0);

    });

    return total;

  }


}
