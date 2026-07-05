import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderResponse } from '../../models/order-response';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-list',
   standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './order-list.html',
  styleUrl: './order-list.css',
})
export class OrderList implements OnInit{

    orders: OrderResponse[] = [];

  loading = false;

  constructor(
    private orderService: OrderService,
    private cdr: ChangeDetectorRef
  ) { }
  ngOnInit(): void {
    this.loadOrders();
  }

    // ===========================
  // Load Orders
  // ===========================

  loadOrders(): void {

    this.loading = true;

    this.orderService.getAll()
      .subscribe({

        next: (response) => {

          this.orders = response;

          this.loading = false;

          this.cdr.markForCheck();

        },

        error: (error) => {

          console.error(error);

          this.loading = false;

        }

      });

  }

  // ===========================
  // Delete Order
  // ===========================

  deleteOrder(id: number): void {

    if (!confirm('Are you sure you want to delete this order?')) {

      return;

    }

    this.orderService.delete(id)
      .subscribe({

        next: () => {

          alert('Order Deleted Successfully');

          this.loadOrders();

        },

        error: (error) => {

          console.error(error);

        }

      });

  }


}
