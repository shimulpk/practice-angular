import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FinishingPlanResponse } from '../../../finishing-plan/models/finishing-plan-response';
import { FinishingProgressResponse } from '../../../finishing-plan/models/finishing-progress-response';
import { FinishingPlanService } from '../../../finishing-plan/services/finishing-plan.service';
import { DayWiseFinishingProductionService } from '../../services/day-wise-finishing-production.service';
import { DayWiseFinishingProductionRequest } from '../../models/day-wise-finishing-production-request';

@Component({
  selector: 'app-day-wise-finishing-production-form',
   standalone: true,
  imports: [ CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './day-wise-finishing-production-form.html',
  styleUrl: './day-wise-finishing-production-form.css',
})
export class DayWiseFinishingProductionForm implements OnInit{

    form!: FormGroup;

  finishingPlans: FinishingPlanResponse[] = [];

  progress?: FinishingProgressResponse;

  loading = false;

  editMode = false;

  id = 0;

  constructor(

    private fb: FormBuilder,

    private finishingPlanService: FinishingPlanService,

    private productionService: DayWiseFinishingProductionService,

    private router: Router,

    private route: ActivatedRoute,

    private cdr: ChangeDetectorRef

  ) { }


  ngOnInit(): void {
     this.buildForm();

    this.loadFinishingPlans();

    this.id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (this.id) {

      this.editMode = true;

      this.loadById();

    }

  }

   buildForm(): void {

    this.form = this.fb.group({

      finishingPlanId: [
        null,
        Validators.required
      ],

      date: [
        '',
        Validators.required
      ],

      passQty: [
        null,
        Validators.required
      ],

      rejectQty: [
        0
      ],

      remarks: ['']

    });

  }

   loadFinishingPlans(): void {

    this.finishingPlanService
      .getAll()
      .subscribe({

        next: (res) => {

          this.finishingPlans = res.filter(

            plan => plan.status === 'IN_PROGRESS'

          );

          this.cdr.markForCheck();

        }

      });

  }

   onFinishingPlanChange(): void {

    const id = Number(

      this.form.get(
        'finishingPlanId'
      )?.value

    );

    console.log("Selected Plan =", id);

    if (!id) {

      return;

    }

    this.productionService
      .getProgress(id)
      .subscribe({

        next: (res) => {

          this.progress = res;

          this.cdr.markForCheck();

        }

      });

  }

  loadById(): void {

    this.loading = true;

    this.productionService
      .getById(this.id)
      .subscribe({

        next: (res) => {

          this.form.patchValue(res);

          this.onFinishingPlanChange();

          this.loading = false;

          this.cdr.markForCheck();

        },

        error: () => {

          this.loading = false;

        }

      });

  }

   submit(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;

    }

    const request: DayWiseFinishingProductionRequest =
      this.form.value;

    if (this.editMode) {

      this.productionService
        .update(this.id, request)
        .subscribe(() => {

          this.router.navigate([
            '/day-wise-finishing-production'
          ]);

        });

    }

    else {

      this.productionService
        .create(request)
        .subscribe(() => {

          this.router.navigate([
            '/day-wise-finishing-production'
          ]);

        });

    }

  }

}
