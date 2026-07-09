import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PurchaseOrderResponse } from '../../models/purchase-order-response';
import { PurchaseOrderService } from '../../services/purchase-order.service';

@Component({
  selector: 'app-purchase-order-details',
   standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './purchase-order-details.html',
  styleUrl: './purchase-order-details.css',
})
export class PurchaseOrderDetails implements OnInit{


    purchaseOrder!: PurchaseOrderResponse;

  loading = false;

  constructor(
    private purchaseOrderService: PurchaseOrderService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
   const id =
      Number(this.route.snapshot.paramMap.get('id'));

    if (id) {

      this.loadPurchaseOrder(id);

    }

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

          this.purchaseOrder = response;

          this.loading = false;
          this.cdr.markForCheck();

        },

        error: err => {

          console.error(err);

          this.loading = false;

        }

      });

  }

  // =====================================
  // Grand Total
  // =====================================

  getGrandTotal(): number {

    if (!this.purchaseOrder?.items) {

      return 0;

    }

    return this.purchaseOrder.items
      .reduce((sum, item) => sum + item.lineTotal, 0);

  }




}
