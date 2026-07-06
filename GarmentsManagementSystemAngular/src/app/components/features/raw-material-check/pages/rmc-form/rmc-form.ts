import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { OrderResponse } from '../../../order/models/order-response';
import { OrderService } from '../../../order/services/order.service';
import { RmcCheckService } from '../../services/rmc-check.service';

@Component({
  selector: 'app-rmc-form',
    standalone: true,
  imports: [  CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './rmc-form.html',
  styleUrl: './rmc-form.css',
})
export class RmcForm  implements OnInit{


   rmcForm!: FormGroup;

  orders: OrderResponse[] = [];

  loading = false;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private rmcService: RmcCheckService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

   ngOnInit(): void {

    this.createForm();

    this.loadOrders();

  }


   // ==========================
  // Create Form
  // ==========================

  createForm(): void {

    this.rmcForm = this.fb.group({

      orderId: [
        null,
        Validators.required
      ]

    });

  }

  // ==========================
  // Load Orders
  // ==========================

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

  // ==========================
  // Generate RMC
  // ==========================

  generate(): void {

    if (this.rmcForm.invalid) {

      this.rmcForm.markAllAsTouched();



        console.log(this.rmcForm.value);

      return;

    }

    this.loading = true;

    this.rmcService.generate(this.rmcForm.value)

      .subscribe({

    
        next: (response) => {

          alert('Raw Material Check Generated Successfully');

        console.log(response);
          this.router.navigate([
            '/raw-material-details',
            response.id
          ]);

        },

        error: (error) => {

          console.error(error);

          this.loading = false;

        }

      });

  }


}
