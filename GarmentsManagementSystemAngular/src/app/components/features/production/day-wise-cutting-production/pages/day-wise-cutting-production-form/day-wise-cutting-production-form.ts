import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CuttingPlanResponse } from '../../../cutting-plan/models/cutting-plan-response';
import { CuttingPlanProgressResponse } from '../../models/cutting-plan-progress-response';
import { DayWiseCuttingProductionRequest } from '../../models/day-wise-cutting-production-request';
import { ActivatedRoute, Router } from '@angular/router';
import { DayWiseCuttingProductionService } from '../../services/day-wise-cutting-production.service';

@Component({
  selector: 'app-day-wise-cutting-production-form',
   standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './day-wise-cutting-production-form.html',
  styleUrl: './day-wise-cutting-production-form.css',
})
export class DayWiseCuttingProductionForm implements OnInit{

    loading = false;

  cuttingPlans: CuttingPlanResponse[] = [];

  selectedPlan?: CuttingPlanResponse;

  progress?: CuttingPlanProgressResponse;

  production: DayWiseCuttingProductionRequest = {

    cuttingPlanId: 0,

    date: '',

    actualCutPieces: 0,

    rejectPieces: 0

  };

  constructor(

    private service: DayWiseCuttingProductionService,

    private router: Router

  ) { }

  
  ngOnInit(): void {
  this.loadCuttingPlans();


  this.production.date = new Date()
    .toISOString()
    .split('T')[0];

    
  }


  // ==========================
// Load Cutting Plans
// ==========================

loadCuttingPlans(): void {

  this.service
    .getCuttingPlans()
    .subscribe({

      next: (response) => {

        // Only Pending Plans
        this.cuttingPlans = response.filter(
          plan => plan.status === 'PENDING'
        );

      },

      error: (error) => {

        console.error(error);

      }

    });

}


// ==========================
// Cutting Plan Changed
// ==========================

onCuttingPlanChange(): void {

  if (!this.production.cuttingPlanId) {

    this.selectedPlan = undefined;

    this.progress = undefined;

    return;

  }

  // Selected Plan
  this.selectedPlan =
    this.cuttingPlans.find(
      plan => plan.id === this.production.cuttingPlanId
    );

  // Progress Summary
  this.service
    .getProgress(this.production.cuttingPlanId)
    .subscribe({

      next: (response) => {

        this.progress = response;

      },

      error: (error) => {

        console.error(error);

        this.progress = undefined;

      }

    });

}

// ==========================
// Save
// ==========================

save(): void {

  if (!this.production.cuttingPlanId) {

    alert('Please Select Cutting Plan');

    return;

  }


  

  if (!this.production.date) {

    alert('Please Select Production Date');

    return;

  }
if (this.production.actualCutPieces <= 0) {

  alert("Enter Today's Cut Pieces");

  return;

}

 // ==========================
  // Validation
  // ==========================

  if (
    this.progress &&
    this.production.actualCutPieces > this.progress.remaining
  ) {

    alert("Today's Cut Pieces cannot exceed Remaining Pieces.");

    return;

  }

  // ==========================
  // Save
  // ==========================

  this.create();

}

// ==========================
// Create
// ==========================

create(): void {

  this.loading = true;

  this.service
    .create(this.production)
    .subscribe({

      next: () => {

        this.loading = false;

        alert('Production Saved Successfully');

        this.router.navigate(['/cutting-production']);

      },

      error: (error) => {

        console.error(error);

        this.loading = false;

        if (error.error?.message) {

          alert(error.error.message);

        } else {

          alert('Failed to Save Production');

        }

      }

    });

}

// ==========================
// Cancel
// ==========================

cancel(): void {

  this.router.navigate(['/cutting-production']);

}




 


}
