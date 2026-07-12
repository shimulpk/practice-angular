import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CuttingPlanResponse } from '../../../cutting-plan/models/cutting-plan-response';
import { CuttingPlanProgressResponse } from '../../models/cutting-plan-progress-response';
import { DayWiseCuttingProductionResponse } from '../../models/day-wise-cutting-production-response';
import { DayWiseCuttingProductionService } from '../../services/day-wise-cutting-production.service';

@Component({
  selector: 'app-day-wise-cutting-production-details',
   standalone: true,
  imports: [ CommonModule,RouterModule],
  templateUrl: './day-wise-cutting-production-details.html',
  styleUrl: './day-wise-cutting-production-details.css',
})
export class DayWiseCuttingProductionDetails implements OnInit{

   cuttingPlanId!: number;

  plan?: CuttingPlanResponse;

  progress?: CuttingPlanProgressResponse;

  productions: DayWiseCuttingProductionResponse[] = [];

  loading = false;

  constructor(
    private service: DayWiseCuttingProductionService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr:ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      this.cuttingPlanId = +id;

      this.loadData();

    }

  }

  // =====================================
  // Load All Data
  // =====================================

  loadData(): void {

    this.loading = true;

    this.loadCuttingPlan();

    this.loadProgress();

    this.loadProductionHistory();
    this.cdr.markForCheck();

  }

  // =====================================
  // Load Cutting Plan
  // =====================================

  loadCuttingPlan(): void {

    this.service
      .getCuttingPlanById(this.cuttingPlanId)
      .subscribe({

        next: (response) => {

          this.plan = response;
          this.cdr.markForCheck();

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

  // =====================================
  // Load Progress
  // =====================================

  loadProgress(): void {

    this.service
      .getProgress(this.cuttingPlanId)
      .subscribe({

        next: (response) => {

          this.progress = response;
          this.cdr.markForCheck();

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

  // =====================================
  // Load Production History
  // =====================================

  loadProductionHistory(): void {

    this.service
      .getByCuttingPlan(this.cuttingPlanId)
      .subscribe({

        next: (response) => {

          this.productions = response;

          this.loading = false;
          this.cdr.markForCheck();

        },

        error: (error) => {

          console.error(error);

          this.loading = false;

        }

      });

  }

  // =====================================
  // Back
  // =====================================

  back(): void {

    this.router.navigate([
      '/cutting-production'
    ]);

  }


}
