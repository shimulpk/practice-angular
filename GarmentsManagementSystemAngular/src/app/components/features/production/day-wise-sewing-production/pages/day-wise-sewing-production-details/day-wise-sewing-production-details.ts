import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SewingPlanResponse } from '../../../sewing-plan/models/sewing-plan-response';
import { DayWiseSewingProductionResponse } from '../../models/day-wise-sewing-production-response';
import { SewingPlanService } from '../../../sewing-plan/services/sewing-plan.service';
import { DayWiseSewingProductionService } from '../../services/day-wise-sewing-production.service';

@Component({
  selector: 'app-day-wise-sewing-production-details',
   standalone: true,
  imports: [ CommonModule,RouterModule],
  templateUrl: './day-wise-sewing-production-details.html',
  styleUrl: './day-wise-sewing-production-details.css',
})
export class DayWiseSewingProductionDetails implements OnInit{

    plan?: SewingPlanResponse;

  productions: DayWiseSewingProductionResponse[] = [];

  loading = false;

  id = 0;

  constructor(

    private route: ActivatedRoute,

    private sewingPlanService: SewingPlanService,

    private productionService: DayWiseSewingProductionService,
    private cdr: ChangeDetectorRef


  ) {}


  ngOnInit(): void {
       this.id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadData();
  }



  loadData(): void {

  this.loading = true;

  this.sewingPlanService
      .getById(this.id)
      .subscribe({

        next: (res) => {

          console.log("PLAN =", res);

          this.plan = res;
          this.cdr.markForCheck();

        },

        error: (err) => {

          console.error("PLAN ERROR", err);

          this.loading = false;

          this.cdr.markForCheck();

        }

      });

  this.productionService
      .getBySewingPlan(this.id)
      .subscribe({

        next: (res) => {

          console.log("PRODUCTION =", res);

          this.productions = res;

          this.loading = false;
          this.cdr.markForCheck();

        },

        error: (err) => {

          console.error("PRODUCTION ERROR", err);

          this.loading = false;
          this.cdr.markForCheck();

        }

      });

}

  getTotalAchieved(): number {

  return this.productions.reduce(

    (sum, item) => sum + item.achievedQuantity,

    0

  );

}

getTotalReject(): number {

  return this.productions.reduce(

    (sum, item) => sum + item.rejectionQty,

    0

  );

}

getAchievementPercentage(): number {

  if (!this.plan || this.plan.inputReceivedQty === 0) {

    return 0;

  }

  return (

    this.getTotalAchieved()

    / this.plan.inputReceivedQty

  ) * 100;

}

  
}
