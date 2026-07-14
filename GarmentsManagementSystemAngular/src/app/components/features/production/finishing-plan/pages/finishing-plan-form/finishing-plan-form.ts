import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SewingPlanResponse } from '../../../sewing-plan/models/sewing-plan-response';
import { FinishingPlanService } from '../../services/finishing-plan.service';
import { SewingPlanService } from '../../../sewing-plan/services/sewing-plan.service';
import { FinishingPlanRequest } from '../../models/finishing-plan-request';

@Component({
  selector: 'app-finishing-plan-form',
   standalone: true,
  imports: [ CommonModule,ReactiveFormsModule, RouterModule],
  templateUrl: './finishing-plan-form.html',
  styleUrl: './finishing-plan-form.css',
})
export class FinishingPlanForm implements OnInit{

   form!: FormGroup;

  sewingPlans: SewingPlanResponse[] = [];
  selectedSewingPlan?: SewingPlanResponse;

  editMode = false;

  id = 0;

  loading = false;

  constructor(

    private fb: FormBuilder,

    private finishingPlanService: FinishingPlanService,

    private sewingPlanService: SewingPlanService,

    private router: Router,

    private route: ActivatedRoute,

    private cdr: ChangeDetectorRef

  ) {}


  ngOnInit(): void {
   this.buildForm();

    this.loadCompletedSewingPlans();

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id) {

      this.editMode = true;

      this.loadById();

    }

  }


 buildForm(): void {

  this.form = this.fb.group({

    sewingPlanId: [null, Validators.required],

    buyerName: [{ value: '', disabled: true }],

    orderNo: [{ value: '', disabled: true }],

    styleNo: [{ value: '', disabled: true }],

    color: [{ value: '', disabled: true }],

    inputQty: [{ value: '', disabled: true }],

    targetQty: [{ value: '', disabled: true }],

    procTrimming: [false],

    procIroning: [false],

    procWashing: [false],

    procButtonAttach: [false],

    finishingTableNo: ['', Validators.required],

    supervisorName: ['', Validators.required],

    startDate: ['', Validators.required],

    endDate: ['', Validators.required]

  });

}

   loadCompletedSewingPlans(): void {

    this.sewingPlanService
      .getAll()
      .subscribe({

        next: (res) => {

          this.sewingPlans = res.filter(

            p => p.status === 'COMPLETED'

          );

          this.cdr.markForCheck();

        }

      });

  }

   loadById(): void {

    this.loading = true;

    this.finishingPlanService
      .getById(this.id)
      .subscribe({

        next: (res) => {

          this.form.patchValue(res);

          this.selectedSewingPlan =
  this.sewingPlans.find(
    p => p.id === res.sewingPlanId
  );

this.form.patchValue({

  buyerName: res.buyerName,

  orderNo: res.orderNo,

  styleNo: res.styleNo,

  color: res.color,

  inputQty: res.inputQty,

   targetQty: res.inputQty

});

this.cdr.markForCheck();

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

    const request: FinishingPlanRequest = this.form.value;

    if (this.editMode) {

      this.finishingPlanService
        .update(this.id, request)
        .subscribe(() => {

          this.router.navigate([
            '/finishing-plan'
          ]);

        });

    } else {

      this.finishingPlanService
        .create(request)
        .subscribe(() => {

          this.router.navigate([
            '/finishing-plan'
          ]);

        });

    }

  }

  onSewingPlanChange(): void {

  const id = Number(
    this.form.get('sewingPlanId')?.value
  );

  this.selectedSewingPlan =
    this.sewingPlans.find(
      p => p.id === id
    );

  if (!this.selectedSewingPlan) {
    return;
  }

  this.form.patchValue({

    buyerName:
      this.selectedSewingPlan.buyerName,

    orderNo:
      this.selectedSewingPlan.orderNo,

    styleNo:
      this.selectedSewingPlan.styleNo,

    color:
      this.selectedSewingPlan.color,

    inputQty:
      this.selectedSewingPlan.inputReceivedQty,

    targetQty:
      this.selectedSewingPlan.inputReceivedQty

  });

  this.cdr.markForCheck();

}



}
