import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CuttingPlanResponse } from '../../models/cutting-plan-response';
import { CuttingPlanService } from '../../services/cutting-plan.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cutting-plan-list',
   standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './cutting-plan-list.html',
  styleUrl: './cutting-plan-list.css',
})
export class CuttingPlanList implements OnInit{

    cuttingPlans: CuttingPlanResponse[] = [];

  filteredCuttingPlans: CuttingPlanResponse[] = [];

  searchText = '';

  loading = false;

  constructor(

    private cuttingPlanService: CuttingPlanService,

    private router: Router,
    private cdr:ChangeDetectorRef

  ) { }


  ngOnInit(): void {
   this.loadData();
  }



    loadData(): void {

    this.loading = true;

    this.cuttingPlanService
      .getAll()
      .subscribe({

        next: (response) => {

          this.cuttingPlans = response;

          this.filteredCuttingPlans = response;

          this.loading = false;
          this.cdr.markForCheck();

        },

        error: (error) => {

          console.error(error);

          this.loading = false;

        }

      });

  }

  search(): void {

    const value = this.searchText.toLowerCase();

    this.filteredCuttingPlans =
      this.cuttingPlans.filter(plan =>

        plan.cuttingPlanId.toLowerCase().includes(value) ||

        plan.buyerName.toLowerCase().includes(value) ||

        plan.orderId.toLowerCase().includes(value) ||

        plan.styleNo.toLowerCase().includes(value)

      );

  }

  details(id: number): void {

    this.router.navigate(['/cutting-plan', id]);

  }

  edit(id: number): void {

    this.router.navigate(['/cutting-plan/edit', id]);

  }

  delete(id: number): void {

    if (!confirm('Are you sure to delete this Cutting Plan?')) {

      return;

    }

    this.cuttingPlanService
      .delete(id)
      .subscribe({

        next: () => {

          this.loadData();

        },

        error: (error) => {

          console.error(error);

        }

      });

  }


}
