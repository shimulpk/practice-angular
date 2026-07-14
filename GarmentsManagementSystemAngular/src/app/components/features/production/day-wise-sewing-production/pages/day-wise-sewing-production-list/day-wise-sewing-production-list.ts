import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SewingPlanResponse } from '../../../sewing-plan/models/sewing-plan-response';
import { SewingPlanService } from '../../../sewing-plan/services/sewing-plan.service';

@Component({
  selector: 'app-day-wise-sewing-production-list',
   standalone: true,
  imports: [ CommonModule,RouterModule],
  templateUrl: './day-wise-sewing-production-list.html',
  styleUrl: './day-wise-sewing-production-list.css',
})
export class DayWiseSewingProductionList implements OnInit{


   sewingPlans: SewingPlanResponse[] = [];

  loading = false;

  constructor(

    private sewingPlanService: SewingPlanService,

    private router: Router,
    private cdr: ChangeDetectorRef

  ) {}

  
  ngOnInit(): void {
    this.loadData();
  }


    loadData(): void {

    this.loading = true;

    this.sewingPlanService
        .getAll()
        .subscribe({

          next: (res) => {

            this.sewingPlans = res;

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
      '/sewing-production',
      id
    ]);

  }



}
