import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BuyerResponse } from '../../../../buyer/models/buyer-response';
import { OrderResponse } from '../../models/order-response';
import { FabricCheckResponse } from '../../models/fabric-check-response';
import { CuttingPlanRequest } from '../../models/cutting-plan-request';
import { CuttingPlanService } from '../../services/cutting-plan.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cutting-plan-form',
   standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './cutting-plan-form.html',
  styleUrl: './cutting-plan-form.css',
})
export class CuttingPlanForm implements OnInit{


    id?: number;

  isEdit = false;

  loading = false;

  buyers: BuyerResponse[] = [];

  orders: OrderResponse[] = [];

  selectedOrder?: OrderResponse;

  fabricInfo?: FabricCheckResponse;

  cuttingPlan: CuttingPlanRequest = {

    buyerId: 0,

    orderId: 0,

    fabricType: '',

    color: '',

    markerLength: 0,

    markerWidth: 0,

    numberOfPlies: 0,

    markerEfficiency: 0,

    cuttingTableNumber: '',

    cuttingMaster: '',

    startDate: '',

    endDate: ''

  };

  constructor(

    private cuttingPlanService: CuttingPlanService,

    private router: Router,

    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef

  ) { }
  ngOnInit(): void {
  this.loadBuyers();

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      this.isEdit = true;

      this.id = +id;

      this.loadCuttingPlan();

    }
  }


    // ==========================
  // Load Buyers
  // ==========================

  loadBuyers(): void {

    this.cuttingPlanService
      .getBuyers()
      .subscribe({

        next: (response) => {

          this.buyers = response;
          this.cdr.markForCheck();

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

   // ==========================
  // Buyer Changed
  // ==========================

  onBuyerChange(): void {

    if (!this.cuttingPlan.buyerId) {

      this.orders = [];

      this.selectedOrder = undefined;

      this.fabricInfo = undefined;

      this.cuttingPlan.orderId = 0;

      return;

    }

    this.selectedOrder = undefined;

    this.fabricInfo = undefined;

    this.cuttingPlan.orderId = 0;

    this.cuttingPlanService
      .getOrdersByBuyer(this.cuttingPlan.buyerId)
      .subscribe({

        next: (response) => {

          this.orders = response;

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

   // ==========================
  // Order Changed
  // ==========================

  onOrderChange(): void {

    if (!this.cuttingPlan.orderId) {

      this.selectedOrder = undefined;

      this.fabricInfo = undefined;

      return;

    }

    // Selected Order
    this.selectedOrder =
      this.orders.find(
        order => order.id === this.cuttingPlan.orderId
      );

    // Fabric Record
    this.cuttingPlanService
      .getFabricByOrder(this.cuttingPlan.orderId)
      .subscribe({

        next: (response) => {

           console.log('Fabric Response:', response);

          this.fabricInfo = response;
          this.cdr.markForCheck();

        },

        error: (error) => {

          console.error(error);

          this.fabricInfo = undefined;

        }

      });

  }

  // ==========================
  // Load Cutting Plan (Edit)
  // ==========================

  loadCuttingPlan(): void {

    if (!this.id) return;

    this.loading = true;

    this.cuttingPlanService
      .getById(this.id)
      .subscribe({

        next: (response) => {

          this.cuttingPlan = {

            buyerId: response.buyerId,

            orderId: response.orderDbId,

            fabricType: response.fabricType,

            color: response.color,

            markerLength: response.markerLength,

            markerWidth: response.markerWidth,

            numberOfPlies: response.numberOfPlies,

            markerEfficiency: response.markerEfficiency,

            cuttingTableNumber: response.cuttingTableNumber,

            cuttingMaster: response.cuttingMaster,

            startDate: response.startDate,

            endDate: response.endDate

          };

          // Load Orders of Selected Buyer
          this.cuttingPlanService
            .getOrdersByBuyer(response.buyerId)
            .subscribe({

              next: (orders) => {

                this.orders = orders;

                this.selectedOrder =
                  orders.find(
                    order => order.id === response.orderDbId
                  );

                // Load Fabric Record
                this.cuttingPlanService
                  .getFabricByOrder(response.orderDbId)
                  .subscribe({

                    next: (fabric) => {

                      this.fabricInfo = fabric;

                      this.loading = false;

                    },

                    error: (error) => {

                      console.error(error);

                      this.loading = false;

                    }

                  });

              },

              error: (error) => {

                console.error(error);

                this.loading = false;

              }

            });

        },

        error: (error) => {

          console.error(error);

          this.loading = false;

        }

      });

  }

  // ==========================
  // Save
  // ==========================

  save(): void {

    if (this.isEdit) {

      this.update();

    } else {

      this.create();

    }

  }

  // ==========================
  // Create
  // ==========================

  create(): void {

    this.loading = true;

    this.cuttingPlanService
      .create(this.cuttingPlan)
      .subscribe({

        next: () => {

          this.loading = false;

          this.router.navigate(['/cutting-plan']);

        },

        error: (error) => {

          console.error(error);

          this.loading = false;

        }

      });

  }

  // ==========================
  // Update
  // ==========================

  update(): void {

    if (!this.id) return;

    this.loading = true;

    this.cuttingPlanService
      .update(this.id, this.cuttingPlan)
      .subscribe({

        next: () => {

          this.loading = false;

          this.router.navigate(['/cutting-plan']);

        },

        error: (error) => {

          console.error(error);

          this.loading = false;

        }

      });

  }

  // ==========================
  // Cancel
  // ==========================

  cancel(): void {

    this.router.navigate(['/cutting-plan']);

  }




}
