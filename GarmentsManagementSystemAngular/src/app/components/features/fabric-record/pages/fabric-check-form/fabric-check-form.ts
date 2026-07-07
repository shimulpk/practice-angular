import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { OrderResponse } from '../../../order/models/order-response';
import { OrderService } from '../../../order/services/order.service';
import { FabricRecordService } from '../../services/fabric-record.service';

@Component({
  selector: 'app-fabric-check-form',
   standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './fabric-check-form.html',
  styleUrl: './fabric-check-form.css',
})
export class FabricCheckForm implements OnInit{


  fabricForm!: FormGroup;

  orders: OrderResponse[] = [];

  loading = false;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private fabricService: FabricRecordService,
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

    this.fabricForm = this.fb.group({

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
  // Generate Fabric Record
  // ==========================

  generate(): void {

    if (this.fabricForm.invalid) {

      this.fabricForm.markAllAsTouched();

      return;

    }

    this.loading = true;

    this.fabricService.generate(
      this.fabricForm.value
    ).subscribe({

      next: (response) => {

        alert('Fabric Record Generated Successfully');

        this.router.navigate([
          '/fabric-record-check',
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
