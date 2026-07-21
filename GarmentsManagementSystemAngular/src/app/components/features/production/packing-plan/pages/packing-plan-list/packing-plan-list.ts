import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PackingPlanResponse } from '../../models/packing-plan-response';
import { PackingPlanService } from '../../services/packing-plan.service';

@Component({
  selector: 'app-packing-plan-list',
   standalone: true,
  imports: [ CommonModule,FormsModule,RouterModule],
  templateUrl: './packing-plan-list.html',
  styleUrl: './packing-plan-list.css',
})
export class PackingPlanList implements OnInit{

 packingPlans: PackingPlanResponse[] = [];

  filteredPackingPlans: PackingPlanResponse[] = [];

  loading = false;

  searchText = '';

  constructor(
    private packingPlanService: PackingPlanService,
    private router: Router,
     private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.loadPackingPlans();

  }

  loadPackingPlans(): void {

    this.loading = true;

    this.packingPlanService
      .getAll()
      .subscribe({

        next: (response) => {

          this.packingPlans = response;

          this.filteredPackingPlans = response;

          this.loading = false;
          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(error);

          this.loading = false;

        }

      });

  }

  search(): void {

    const value = this.searchText.toLowerCase();

    this.filteredPackingPlans =
      this.packingPlans.filter(plan =>

        plan.packingPlanId.toLowerCase().includes(value) ||

        plan.buyerName.toLowerCase().includes(value) ||

        plan.orderNo.toLowerCase().includes(value) ||

        plan.styleNo.toLowerCase().includes(value)

      );

  }

  editPackingPlan(id: number): void {

    this.router.navigate([
      '/packing-plans/edit',
      id
    ]);

  }

  deletePackingPlan(id: number): void {

    if (!confirm('Are you sure you want to delete this Packing Plan?')) {

      return;

    }

    this.packingPlanService
      .delete(id)
      .subscribe({

        next: () => {

          this.loadPackingPlans();

        },

        error: (error) => {

          console.error(error);

        }

      });

  }
}
