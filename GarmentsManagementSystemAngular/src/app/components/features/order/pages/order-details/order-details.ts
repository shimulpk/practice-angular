import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { OrderResponse } from '../../models/order-response';

@Component({
  selector: 'app-order-details',
   standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './order-details.html',
  styleUrl: './order-details.css',
})
export class OrderDetails implements OnInit{

  order?: OrderResponse;

  loading = false;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    const id =
      Number(this.route.snapshot.paramMap.get('id'));

    this.loadOrder(id);

  }

   // ==========================
  // Load Order
  // ==========================

  loadOrder(id: number): void {

    this.loading = true;

    this.orderService.getById(id)
      .subscribe({

        next: (response) => {

          this.order = response;

          this.loading = false;
          this.cdr.markForCheck();

        },

        error: (error) => {

          console.error(error);

          this.loading = false;
          this.cdr.markForCheck();

        }

      });

  }


}
