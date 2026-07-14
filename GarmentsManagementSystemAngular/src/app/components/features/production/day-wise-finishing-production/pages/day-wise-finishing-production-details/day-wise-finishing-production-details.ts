import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FinishingPlanResponse } from '../../../finishing-plan/models/finishing-plan-response';
import { DayWiseFinishingProductionResponse } from '../../models/day-wise-finishing-production-response';
import { FinishingPlanService } from '../../../finishing-plan/services/finishing-plan.service';
import { DayWiseFinishingProductionService } from '../../services/day-wise-finishing-production.service';

@Component({
  selector: 'app-day-wise-finishing-production-details',
 standalone: true,
  imports: [ CommonModule,RouterModule],
  templateUrl: './day-wise-finishing-production-details.html',
  styleUrl: './day-wise-finishing-production-details.css',
})
export class DayWiseFinishingProductionDetails implements OnInit{


  plan?: FinishingPlanResponse;

  productions: DayWiseFinishingProductionResponse[] = [];

  loading = false;

  id = 0;

  constructor(

    private route: ActivatedRoute,

    private finishingPlanService: FinishingPlanService,

    private productionService: DayWiseFinishingProductionService,

    private cdr: ChangeDetectorRef

  ) { }


  ngOnInit(): void {
      this.id = Number(

      this.route.snapshot.paramMap.get('id')

    );

    this.loadData();

  }


    loadData(): void {

    this.loading = true;

    this.finishingPlanService
      .getById(this.id)
      .subscribe({

        next: (res) => {

          console.log('PLAN =', res);

          this.plan = res;

          this.cdr.markForCheck();

        },

        error: (err) => {

          console.error(err);

        }

      });

    this.productionService
      .getByFinishingPlan(this.id)
      .subscribe({

        next: (res) => {

          console.log('PRODUCTIONS =', res);

          this.productions = res;

          this.loading = false;

          this.cdr.markForCheck();

        },

        error: (err) => {

          console.error(err);

          this.loading = false;

        }

      });

  }

  getTotalPass(): number {

    return this.productions.reduce(

      (sum, item) => sum + item.passQty,

      0

    );

  }

  getTotalReject(): number {

    return this.productions.reduce(

      (sum, item) => sum + item.rejectQty,

      0

    );

  }

  getAchievementPercentage(): number {

    if (!this.plan || !this.plan.targetQty) {

      return 0;

    }

    return (

      this.getTotalPass()

      / this.plan.targetQty

    ) * 100;

  }

}
