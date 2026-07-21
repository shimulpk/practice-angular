import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FinishingPlanResponse } from '../../../finishing-plan/models/finishing-plan-response';
import { PackingPlanService } from '../../services/packing-plan.service';
import { FinishingPlanService } from '../../../finishing-plan/services/finishing-plan.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PackingPlanResponse } from '../../models/packing-plan-response';
import { PackingPlanRequest } from '../../models/packing-plan-request';

@Component({
  selector: 'app-packing-plan-form',
   standalone: true,
  imports: [ CommonModule,
    ReactiveFormsModule],
  templateUrl: './packing-plan-form.html',
  styleUrl: './packing-plan-form.css',
})
export class PackingPlanForm implements OnInit{

  form!: FormGroup;

  finishingPlans: FinishingPlanResponse[] = [];

  editMode = false;

  packingPlanId = 0;

  loading = false;

  saving = false;

  constructor(
    private fb: FormBuilder,
    private packingPlanService: PackingPlanService,
    private finishingPlanService: FinishingPlanService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.createForm();

    this.loadFinishingPlans();

    this.route.paramMap.subscribe(params => {

      const id = params.get('id');

      if (id) {

        this.editMode = true;

        this.packingPlanId = +id;

        this.loadPackingPlan();

      }

    });

    // Finishing Plan Change
    this.form.get('finishingPlanId')?.valueChanges.subscribe(id => {

      this.onFinishingPlanChange(id);

    });

    // PCS Per Carton Change
    this.form.get('pcsPerCarton')?.valueChanges.subscribe(() => {

      this.calculateCartons();

    });

  }

  private createForm(): void {

    this.form = this.fb.group({

      finishingPlanId: [
        null,
        Validators.required
      ],

      // Auto Fill
      buyerName: [
        {
          value: '',
          disabled: true
        }
      ],

      orderNo: [
        {
          value: '',
          disabled: true
        }
      ],

      styleNo: [
        {
          value: '',
          disabled: true
        }
      ],

      color: [
        {
          value: '',
          disabled: true
        }
      ],

      totalOrderQty: [
        {
          value: 0,
          disabled: true
        }
      ],

      pcsPerCarton: [
        null,
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

      totalPlannedCartons: [
        {
          value: 0,
          disabled: true
        }
      ],

      packingMethod: [
        '',
        Validators.required
      ],

      polyBagType: [
        '',
        Validators.required
      ],

      hangTag: [
        false
      ],

      packingSupervisor: [
        '',
        Validators.required
      ],

      startDate: [
        '',
        Validators.required
      ],

      expectedShipmentDate: [
        '',
        Validators.required
      ]

    });

  }

   private loadFinishingPlans(): void {

    this.finishingPlanService
      .getAll()
      .subscribe({

        next: (response: FinishingPlanResponse[]) => {

          this.finishingPlans = response;
          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

  private onFinishingPlanChange(
    finishingPlanId: number
  ): void {

    const selectedPlan =
      this.finishingPlans.find(

        plan => plan.id === +finishingPlanId

      );

    if (!selectedPlan) {

      this.form.patchValue({

        buyerName: '',

        orderNo: '',

        styleNo: '',

        color: '',

        totalOrderQty: 0,

        totalPlannedCartons: 0

      });

      return;

    }

    this.form.patchValue({

      buyerName: selectedPlan.buyerName,

      orderNo: selectedPlan.orderNo,

      styleNo: selectedPlan.styleNo,

      color: selectedPlan.color,

      totalOrderQty: selectedPlan.targetQty

    });

    this.calculateCartons();

  }

  private calculateCartons(): void {

    const totalOrderQty =
      Number(
        this.form.get('totalOrderQty')?.value
      ) || 0;

    const pcsPerCarton =
      Number(
        this.form.get('pcsPerCarton')?.value
      ) || 0;

    if (
      totalOrderQty > 0 &&
      pcsPerCarton > 0
    ) {

      const cartons =
        Math.ceil(
          totalOrderQty /
          pcsPerCarton
        );

      this.form.patchValue({

        totalPlannedCartons: cartons

      });

    } else {

      this.form.patchValue({

        totalPlannedCartons: 0

      });

    }

  }

  private loadPackingPlan(): void {

    this.loading = true;

    this.packingPlanService
      .getById(this.packingPlanId)
      .subscribe({

        next: (
          response: PackingPlanResponse
        ) => {

          this.form.patchValue({

            finishingPlanId:
              response.finishingPlanId,

            buyerName:
              response.buyerName,

            orderNo:
              response.orderNo,

            styleNo:
              response.styleNo,

            color:
              response.color,

            totalOrderQty:
              response.totalOrderQty,

            pcsPerCarton:
              response.pcsPerCarton,

            totalPlannedCartons:
              response.totalPlannedCartons,

            packingMethod:
              response.packingMethod,

            polyBagType:
              response.polyBagType,

            hangTag:
              response.hangTag,

            packingSupervisor:
              response.packingSupervisor,

            startDate:
              response.startDate,

            expectedShipmentDate:
              response.expectedShipmentDate

          });

          this.loading = false;

        },

        error: (error) => {

          console.error(error);

          this.loading = false;

        }

      });

  }

   save(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;

    }

    this.saving = true;

    const request: PackingPlanRequest = {

      finishingPlanId:
        this.form.get('finishingPlanId')?.value,

      pcsPerCarton:
        this.form.get('pcsPerCarton')?.value,

      packingMethod:
        this.form.get('packingMethod')?.value,

      polyBagType:
        this.form.get('polyBagType')?.value,

      hangTag:
        this.form.get('hangTag')?.value,

      packingSupervisor:
        this.form.get('packingSupervisor')?.value,

      startDate:
        this.form.get('startDate')?.value,

      expectedShipmentDate:
        this.form.get('expectedShipmentDate')?.value

    };

    if (this.editMode) {

      this.update(request);

    } else {

      this.create(request);

    }

  }

  private create(
    request: PackingPlanRequest
  ): void {

    this.packingPlanService
      .create(request)
      .subscribe({

        next: () => {

          this.saving = false;

          alert(
            'Packing Plan Created Successfully'
          );

          this.router.navigate([
            '/packing-plans'
          ]);

        },

        error: (error) => {

          console.error(error);

          this.saving = false;

          alert(
            'Failed To Create Packing Plan'
          );

        }

      });

  }

  private update(
    request: PackingPlanRequest
  ): void {

    this.packingPlanService
      .update(
        this.packingPlanId,
        request
      )
      .subscribe({

        next: () => {

          this.saving = false;

          alert(
            'Packing Plan Updated Successfully'
          );

          this.router.navigate([
            '/packing-plans'
          ]);

        },

        error: (error) => {

          console.error(error);

          this.saving = false;

          alert(
            'Failed To Update Packing Plan'
          );

        }

      });

  }

  cancel(): void {

    this.router.navigate([
      '/packing-plans'
    ]);

  }


}
