import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderResponse } from '../../models/order-response';
import { OrderService } from '../../services/order.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-list',
   standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './order-list.html',
  styleUrl: './order-list.css',
})
export class OrderList implements OnInit{

    orders: OrderResponse[] = [];

    filteredOrders: OrderResponse[] = [];

         searchText = '';

       selectedStatus = 'ALL';

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
          this.filteredOrders = [...response];


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



  filterOrders(): void {

  this.filteredOrders = this.orders.filter(order => {

    const keyword = this.searchText.toLowerCase();

    const matchesSearch =

      order.orderId.toLowerCase().includes(keyword) ||

      order.poNumber.toLowerCase().includes(keyword) ||

      order.buyerName.toLowerCase().includes(keyword) ||

      order.styleName.toLowerCase().includes(keyword);

    const matchesStatus =

      this.selectedStatus === 'ALL' ||

      order.status === this.selectedStatus;

    return matchesSearch && matchesStatus;

  });

}



// Card View Total Orders
getTotalOrders(): number {

  return this.orders.length;

}


// Card View Pending Orders
getPendingOrders(): number {

  return this.orders.filter(

    order => order.status === 'PENDING'

  ).length;

}


// Card View Confirmed Orders
getConfirmedOrders(): number {

  return this.orders.filter(

    order => order.status === 'CONFIRMED'

  ).length;

}


// Card View Rejected Orders
getRejectedOrders(): number {

  return this.orders.filter(

    order => order.status === 'REJECTED'

  ).length;

}









}
