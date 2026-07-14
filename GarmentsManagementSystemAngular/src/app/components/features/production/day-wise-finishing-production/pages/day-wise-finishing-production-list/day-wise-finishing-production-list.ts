import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FinishingPlanService } from '../../../finishing-plan/services/finishing-plan.service';
import { FinishingPlanResponse } from '../../../finishing-plan/models/finishing-plan-response';

@Component({
  selector: 'app-day-wise-finishing-production-list',
   standalone: true,
  imports: [ CommonModule, RouterModule],
  templateUrl: './day-wise-finishing-production-list.html',
  styleUrl: './day-wise-finishing-production-list.css',
})
export class DayWiseFinishingProductionList implements OnInit{


  plans: FinishingPlanResponse[] = [];

  loading = false;

  constructor(

    private finishingPlanService: FinishingPlanService,

    private router: Router,

    private cdr: ChangeDetectorRef

  ) { }


  ngOnInit(): void {
     this.loadData();
  }

    loadData(): void {

    this.loading = true;

    this.finishingPlanService
      .getAll()
      .subscribe({

        next: (res) => {

          this.plans = res;

          this.loading = false;

          this.cdr.markForCheck();

        },

        error: (err) => {

          console.error(err);

          this.loading = false;

        }

      });

  }

  view(id: number): void {

    this.router.navigate([
      '/day-wise-finishing-production',
      id
    ]);

  }

}
