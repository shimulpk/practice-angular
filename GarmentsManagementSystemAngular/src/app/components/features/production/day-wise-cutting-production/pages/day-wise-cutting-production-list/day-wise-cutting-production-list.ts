import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DayWiseCuttingProductionResponse } from '../../models/day-wise-cutting-production-response';
import { DayWiseCuttingProductionService } from '../../services/day-wise-cutting-production.service';
import { CuttingPlanResponse } from '../../../cutting-plan/models/cutting-plan-response';
import { CuttingPlanProgressResponse } from '../../models/cutting-plan-progress-response';


@Component({
  selector: 'app-day-wise-cutting-production-list',
   standalone: true,
  imports: [ CommonModule,RouterModule],
  templateUrl: './day-wise-cutting-production-list.html',
  styleUrl: './day-wise-cutting-production-list.css',
})
export class DayWiseCuttingProductionList implements OnInit{

  cuttingPlans: CuttingPlanResponse[] = [];

  loading = false;

  constructor(
    private service: DayWiseCuttingProductionService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.loadCuttingPlans();

  }

  // =====================================
  // Load Cutting Plans
  // =====================================

  loadCuttingPlans(): void {

    this.loading = true;

    this.service
      .getCuttingPlans()
      .subscribe({

        next: (response) => {

          this.cuttingPlans = response;

          this.loading = false;
          this.cdr.markForCheck();

        },

        error: (error) => {

          console.error(error);

          this.loading = false;
           this.cdr.markForCheck();

        }

      });

  }

  // =====================================
  // View Details
  // =====================================

  view(planId: number): void {

    this.router.navigate([
      '/cutting-production/details',
      planId
    ]);

  }

  

}
