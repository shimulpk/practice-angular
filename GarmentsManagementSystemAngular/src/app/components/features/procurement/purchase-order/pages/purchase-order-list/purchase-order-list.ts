import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PurchaseOrderResponse } from '../../models/purchase-order-response';
import { PurchaseOrderService } from '../../services/purchase-order.service';

@Component({
  selector: 'app-purchase-order-list',
   standalone: true,
  imports: [ CommonModule, RouterModule],
  templateUrl: './purchase-order-list.html',
  styleUrl: './purchase-order-list.css',
})
export class PurchaseOrderList implements OnInit{

    purchaseOrders: PurchaseOrderResponse[] = [];

  loading = false;

  constructor(
    private purchaseOrderService: PurchaseOrderService,
    private router: Router,
    private cdr:ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    this.loadPurchaseOrders();
  }

   // =====================================
  // Load Purchase Orders
  // =====================================

  loadPurchaseOrders(): void {

    this.loading = true;

    this.purchaseOrderService
      .getAll()
      .subscribe({

        next: (data) => {

          this.purchaseOrders = data;

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
  // Delete Purchase Order
  // =====================================

  deletePurchaseOrder(id: number): void {

    if (!confirm('Are you sure you want to delete this Purchase Order?')) {

      return;

    }

    this.purchaseOrderService
      .delete(id)
      .subscribe({

        next: () => {

          alert('Purchase Order Deleted Successfully');

          this.loadPurchaseOrders();

        },

        error: err => {

          console.error(err);

        }

      });

  }




}
