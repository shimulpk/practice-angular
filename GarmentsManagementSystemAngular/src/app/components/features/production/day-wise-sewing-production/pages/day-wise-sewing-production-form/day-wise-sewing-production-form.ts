import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SewingPlanResponse } from '../../../sewing-plan/models/sewing-plan-response';
import { ProductionLineResponse } from '../../../production-line/models/production-line-response';
import { SewingPlanProgressResponse } from '../../models/sewing-plan-progress-response';
import { DayWiseSewingProductionService } from '../../services/day-wise-sewing-production.service';
import { SewingPlanService } from '../../../sewing-plan/services/sewing-plan.service';
import { ProductionLineService } from '../../../production-line/services/production-line.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-day-wise-sewing-production-form',
    standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule,FormsModule],
  templateUrl: './day-wise-sewing-production-form.html',
  styleUrl: './day-wise-sewing-production-form.css',
})
export class DayWiseSewingProductionForm implements OnInit{


  form!: FormGroup;

id = 0;

isEdit = false;

saving = false;

sewingPlans: SewingPlanResponse[] = [];

productionLines: ProductionLineResponse[] = [];

progress?: SewingPlanProgressResponse;

constructor(

  private fb: FormBuilder,

  private service: DayWiseSewingProductionService,

  private sewingPlanService: SewingPlanService,

  private productionLineService: ProductionLineService,

  private router: Router,

  private route: ActivatedRoute,
  private cdr: ChangeDetectorRef

) {}


  ngOnInit(): void {
    this.createForm();

  this.loadSewingPlans();

  this.loadProductionLines();

  this.id = Number(
    this.route.snapshot.paramMap.get('id')
  );

  if (this.id) {

    this.isEdit = true;

    this.loadById();

  }

  }

  createForm(): void {

  this.form = this.fb.group({

    sewingPlanId: [
      '',
      Validators.required
    ],

    productionLineId: [
      '',
      Validators.required
    ],

    date: [
      '',
      Validators.required
    ],

    achievedQuantity: [
      '',
      Validators.required
    ],

    rejectionQty: [
      0
    ]

  });

  this.form
    .get('sewingPlanId')
    ?.valueChanges
    .subscribe(() => {

      this.loadProgress();
      

    });
   

this.form
    .get('productionLineId')
    ?.valueChanges
    .subscribe(() => {

      this.loadProgress();
      

    });

   


}

loadSewingPlans(): void {

  this.sewingPlanService
      .getAll()
      .subscribe({

        next: (res) => {

          this.sewingPlans = res;
         

        }

      });

     

}

loadProductionLines(): void {

  this.productionLineService
      .getAll()
      .subscribe({

        next: (res) => {

          this.productionLines = res;
           
          

        }

      });

}

loadById(): void {

  this.service
      .getById(this.id)
      .subscribe({

        next: (res) => {

          this.form.patchValue(res);
           

        }

      });
      

}

loadProgress(): void {

  const sewingPlanId =
    this.form.get('sewingPlanId')?.value;

  const productionLineId =
    this.form.get('productionLineId')?.value;

  if (!sewingPlanId || !productionLineId) {

    this.progress = undefined;

    this.cdr.detectChanges();

    return;

  }

  this.service
      .getProgress(
        sewingPlanId,
        productionLineId
      )
      .subscribe({

        next: (res) => {

          this.progress = res;
          this.cdr.detectChanges();

        }

      });

}

save(): void {

  if (this.form.invalid) {

    this.form.markAllAsTouched();
     

    return;

  }

  this.saving = true;

  if (this.isEdit) {

    this.service
        .update(
          this.id,
          this.form.value
        )
        .subscribe({

          next: () => {

            this.saving = false;

            this.router.navigate([
              '/sewing-production'
            ]);

          },

          error: (err) => {

            console.error(err);

            this.saving = false;

          }

        });

  }

  else {

    this.service
        .create(
          this.form.value
        )
        .subscribe({

          next: () => {

            this.saving = false;

            this.router.navigate([
              '/sewing-production'
            ]);

          },

          error: (err) => {

            console.error(err);

            this.saving = false;

          }

        });

  }
}


}
