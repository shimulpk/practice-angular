import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PackingPlanResponse } from '../../../packing-plan/models/packing-plan-response';
import { DayWisePackingProductionResponse } from '../../models/day-wise-packing-production-response';
import { PackingPlanService } from '../../../packing-plan/services/packing-plan.service';
import { DayWisePackingProductionService } from '../../services/day-wise-packing-production.service';

@Component({
  selector: 'app-day-wise-packing-production-details',
   standalone: true,
  imports: [ CommonModule, RouterModule],
  templateUrl: './day-wise-packing-production-details.html',
  styleUrl: './day-wise-packing-production-details.css',
})
export class DayWisePackingProductionDetails implements OnInit{

 packingPlanId!: number;

  packingPlan!: PackingPlanResponse;

  productions: DayWisePackingProductionResponse[] = [];

  loading = false;

  constructor(

    private route: ActivatedRoute,

    private router: Router,

    private packingPlanService: PackingPlanService,

    private productionService: DayWisePackingProductionService,

    private cdr: ChangeDetectorRef

  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {

      const id = params.get('id');

      if (id) {

        this.packingPlanId = +id;

        this.loadPackingPlan();

        this.loadHistory();

      }

    });

  }

  private loadPackingPlan(): void {

    this.loading = true;

    this.packingPlanService
      .getById(this.packingPlanId)
      .subscribe({

        next: response => {

          this.packingPlan = response;

          this.loading = false;

          this.cdr.detectChanges();

        },

        error: err => {

          console.error(err);

          this.loading = false;

        }

      });

  }

  private loadHistory(): void {

    this.productionService
      .getByPackingPlan(this.packingPlanId)
      .subscribe({

        next: response => {

          this.productions = response;

          this.cdr.detectChanges();

        },

        error: err => {

          console.error(err);

        }

      });

  }

  back(): void {

    this.router.navigate([
      '/day-wise-packing-productions'
    ]);

  }
}
