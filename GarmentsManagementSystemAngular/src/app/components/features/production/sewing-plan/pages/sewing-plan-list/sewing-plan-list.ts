import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SewingPlanResponse } from '../../models/sewing-plan-response';
import { SewingPlanService } from '../../services/sewing-plan.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sewing-plan-list',
    standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './sewing-plan-list.html',
  styleUrl: './sewing-plan-list.css',
})
export class SewingPlanList implements OnInit{


  sewingPlans: SewingPlanResponse[] = [];

loading = false;

constructor(

  private sewingPlanService: SewingPlanService,

  private router: Router

) {}


  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {

  this.loading = true;

  this.sewingPlanService

      .getAll()

      .subscribe({

        next: (response) => {

          this.sewingPlans = response;

          this.loading = false;

        },

        error: (error) => {

          console.error(error);

          this.loading = false;

        }

      });

}

delete(id: number): void {

  if (!confirm('Delete Sewing Plan?')) {

    return;

  }

  this.sewingPlanService

      .delete(id)

      .subscribe(() => {

        this.loadData();

      });

}

getProgress(plan: SewingPlanResponse): number {

  if (!plan.inputReceivedQty) {

    return 0;

  }

  return (

    plan.outputQty

    / plan.inputReceivedQty

  ) * 100;

}

getRemaining(plan: SewingPlanResponse): number {

  return (

    plan.inputReceivedQty

    - plan.outputQty

  );

}


}
