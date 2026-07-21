import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DayWisePackingProductionService } from '../../services/day-wise-packing-production.service';
import { PackingPlanService } from '../../../packing-plan/services/packing-plan.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DayWisePackingProductionRequest } from '../../models/day-wise-packing-production-request';
import { PackingPlanResponse } from '../../../packing-plan/models/packing-plan-response';
import { PackingPlanProgressResponse } from '../../models/packing-plan-progress-response';

@Component({
  selector: 'app-day-wise-packing-production-form',
    standalone: true,
  imports: [ CommonModule,ReactiveFormsModule],
  templateUrl: './day-wise-packing-production-form.html',
  styleUrl: './day-wise-packing-production-form.css',
})
export class DayWisePackingProductionForm implements OnInit{

 form!: FormGroup;

  packingPlans: PackingPlanResponse[] = [];

  progress?: PackingPlanProgressResponse;

  editMode = false;

  productionId = 0;

  loading = false;

  saving = false;

  constructor(
    private fb: FormBuilder,
    private productionService: DayWisePackingProductionService,
    private packingPlanService: PackingPlanService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.createForm();

    this.loadPackingPlans();

    this.route.paramMap.subscribe(params => {

      const id = params.get('id');

      if (id) {

        this.editMode = true;

        this.productionId = +id;

        this.loadProduction();

      }

    });

    this.form.get('packingPlanId')?.valueChanges.subscribe(id => {

      if (id) {

        this.loadProgress(id);

      }

    });

    this.form.get('todayPackedQty')?.valueChanges.subscribe(() => {

      this.calculateCartons();

    });

  }

  private createForm(): void {

    this.form = this.fb.group({

      date: [
        '',
        Validators.required
      ],

      packingPlanId: [
        null,
        Validators.required
      ],

      todayPackedQty: [
        null,
        [
          Validators.required,
          Validators.min(0)
        ]
      ],

      todayPackedCartons: [
        {
          value: 0,
          disabled: true
        }
      ],

      todayRejectQty: [
        0,
        [
          Validators.required,
          Validators.min(0)
        ]
      ]

    });

  }


  private loadPackingPlans(): void {

  this.packingPlanService
    .getAll()
    .subscribe({

      next: (response) => {

        this.packingPlans = response;

        this.cdr.detectChanges();

      },

      error: (error) => {

        console.error(error);

      }

    });

}

private loadProgress(
  packingPlanId: number
): void {

  this.productionService
    .getProgress(packingPlanId)
    .subscribe({

      next: (response) => {

        this.progress = response;

        this.calculateCartons();

        this.cdr.detectChanges();

      },

      error: (error) => {

        console.error(error);

      }

    });

}

private calculateCartons(): void {

  if (!this.progress) {

    this.form.patchValue({

      todayPackedCartons: 0

    });

    return;

  }

  const packedQty =
    Number(
      this.form.get('todayPackedQty')?.value
    ) || 0;

  const pcsPerCarton =
    this.progress.pcsPerCarton || 1;

  const cartons =
    Math.ceil(
      packedQty / pcsPerCarton
    );

  this.form.patchValue({

    todayPackedCartons: cartons

  });

}

private loadProduction(): void {

  this.loading = true;

  this.productionService
    .getById(this.productionId)
    .subscribe({

      next: (response) => {

        this.form.patchValue({

          date: response.date,

          packingPlanId: response.packingPlanId,

          todayPackedQty: response.todayPackedQty,

          todayPackedCartons: response.todayPackedCartons,

          todayRejectQty: response.todayRejectQty

        });

        this.loadProgress(
          response.packingPlanId
        );

        this.loading = false;

        this.cdr.detectChanges();

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

  const request: DayWisePackingProductionRequest = {

    packingPlanId:
      this.form.get('packingPlanId')?.value,

    date:
      this.form.get('date')?.value,

    todayPackedQty:
      this.form.get('todayPackedQty')?.value,

    todayRejectQty:
      this.form.get('todayRejectQty')?.value

  };

  if (this.editMode) {

    this.update(request);

  } else {

    this.create(request);

  }

}

private create(
  request: DayWisePackingProductionRequest
): void {

  this.productionService
    .create(request)
    .subscribe({

      next: () => {

        this.saving = false;

        alert(
          'Day Wise Packing Production Created Successfully'
        );

        this.router.navigate([
          '/day-wise-packing-productions'
        ]);

      },

      error: (error) => {

        console.error(error);

        this.saving = false;

        alert(
          'Failed To Create Day Wise Packing Production'
        );

      }

    });

}

private update(
  request: DayWisePackingProductionRequest
): void {

  this.productionService
    .update(
      this.productionId,
      request
    )
    .subscribe({

      next: () => {

        this.saving = false;

        alert(
          'Day Wise Packing Production Updated Successfully'
        );

        this.router.navigate([
          '/day-wise-packing-productions'
        ]);

      },

      error: (error) => {

        console.error(error);

        this.saving = false;

        alert(
          'Failed To Update Day Wise Packing Production'
        );

      }

    });

}

cancel(): void {

  this.router.navigate([
    '/day-wise-packing-productions'
  ]);

}
}
