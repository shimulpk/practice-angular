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

  productions: DayWiseCuttingProductionResponse[] = [];

  progress?: CuttingPlanProgressResponse;

  selectedPlan?: CuttingPlanResponse;

  loading = false;

  constructor(
    private service: DayWiseCuttingProductionService
  ) {}


  ngOnInit(): void {
   this.loadCuttingPlans();
  }



  

}
