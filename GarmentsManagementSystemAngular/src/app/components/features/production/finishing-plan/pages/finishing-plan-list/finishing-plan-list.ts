import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FinishingPlanResponse } from '../../models/finishing-plan-response';
import { FinishingPlanService } from '../../services/finishing-plan.service';

@Component({
  selector: 'app-finishing-plan-list',
   standalone: true,
  imports: [  CommonModule,RouterModule],
  templateUrl: './finishing-plan-list.html',
  styleUrl: './finishing-plan-list.css',
})
export class FinishingPlanList implements OnInit{

  finishingPlans: FinishingPlanResponse[] = [];

  loading = false;

  constructor(

    private finishingPlanService: FinishingPlanService,

    private cdr: ChangeDetectorRef

  ) {}


  ngOnInit(): void {
   this.loadFinishingPlans();
  }

  loadFinishingPlans(): void {

    this.loading = true;

    this.finishingPlanService
      .getAll()
      .subscribe({

        next: (res) => {

          this.finishingPlans = res;

          this.loading = false;

          this.cdr.markForCheck();

        },

        error: (err) => {

          console.error(err);

          this.loading = false;

          this.cdr.markForCheck();

        }

      });

  }

  delete(id: number): void {

    if (!confirm('Delete this Finishing Plan?')) {

      return;

    }

    this.finishingPlanService
      .delete(id)
      .subscribe(() => {

        this.loadFinishingPlans();

      });

  }

  getProgress(plan: FinishingPlanResponse): number {

    if (!plan.targetQty || plan.targetQty === 0) {

      return 0;

    }

    return (plan.passQty / plan.targetQty) * 100;

  }


}
