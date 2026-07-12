import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CuttingPlanResponse } from '../../../cutting-plan/models/cutting-plan-response';
import { ProductionLineResponse } from '../../../production-line/models/production-line-response';
import { SewingPlanRequest } from '../../models/sewing-plan-request';
import { SewingPlanService } from '../../services/sewing-plan.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SewingPlanResponse } from '../../models/sewing-plan-response';

@Component({
  selector: 'app-sewing-plan-form',
   standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './sewing-plan-form.html',
  styleUrl: './sewing-plan-form.css',
})
export class SewingPlanForm implements OnInit{


    id?: number;

  isEdit = false;

  loading = false;

  // Dropdown

  cuttingPlans: CuttingPlanResponse[] = [];

  productionLines: ProductionLineResponse[] = [];

  // Auto Fill

  selectedPlan?: CuttingPlanResponse;

  // Form

  sewingPlan: SewingPlanRequest = {

    cuttingPlanId: 0,

    startDate: '',

    endDate: '',

    targets: []

  };

  constructor(

    private service: SewingPlanService,

    private router: Router,

    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef

  ) { }


  ngOnInit(): void {
     this.loadCompletedPlans();

    this.loadProductionLines();

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      this.isEdit = true;

      this.id = +id;

      this.loadById();

    }
  }


   // =====================================
  // Load Completed Cutting Plans
  // =====================================

  loadCompletedPlans(): void {

    this.service
      .getCompletedCuttingPlans()
      .subscribe({

        next: res => {

          this.cuttingPlans = res;
          this.cdr.markForCheck();

        },

        error: err => console.error(err)
         

      });

  }

  // =====================================
  // Load Production Lines
  // =====================================

  loadProductionLines(): void {

    this.service
      .getProductionLines()
      .subscribe({

        next: res => {

          this.productionLines = res;
            this.cdr.markForCheck();

        },

        error: err => console.error(err)

      });

  }

  // =====================================
  // Cutting Plan Change
  // =====================================

  onCuttingPlanChange(): void {

    if (!this.sewingPlan.cuttingPlanId) {

      this.selectedPlan = undefined;

      return;

    }

    this.service
      .getCuttingPlanById(this.sewingPlan.cuttingPlanId)
      .subscribe({

        next: res => {

          this.selectedPlan = res;

        },

        error: err => {

          console.error(err);

          this.selectedPlan = undefined;

        }

      });

  }

  // =====================================
  // Dynamic Row
  // =====================================

  addRow(): void {

    this.sewingPlan.targets.push({

      productionLineId: 0,

      targetQuantity: 0

    });

  }

  removeRow(index: number): void {

    this.sewingPlan.targets.splice(index, 1);

  }

  // =====================================
  // Save
  // =====================================

  save(): void {



    // ==========================
  // Cutting Plan
  // ==========================

  if (!this.sewingPlan.cuttingPlanId) {

    alert('Please Select Cutting Plan');

    return;

  }

  // ==========================
  // Date
  // ==========================

  if (!this.sewingPlan.startDate) {

    alert('Please Select Start Date');

    return;

  }

  if (!this.sewingPlan.endDate) {

    alert('Please Select End Date');

    return;

  }

  // ==========================
  // At Least One Line
  // ==========================

  if (this.sewingPlan.targets.length === 0) {

    alert('Please Add At Least One Production Line');

    return;

  }

  // ==========================
  // Duplicate Line Check
  // ==========================

  const lineIds = this.sewingPlan.targets.map(
    t => t.productionLineId
  );

  const duplicate = lineIds.some(
    (id, index) => lineIds.indexOf(id) !== index
  );

  if (duplicate) {

    alert('Same Production Line Cannot Be Selected Twice');

    return;

  }

  // ==========================
  // Target Qty Validation
  // ==========================

  for (const target of this.sewingPlan.targets) {

    if (!target.productionLineId) {

      alert('Please Select Production Line');

      return;

    }

    if (!target.targetQuantity || target.targetQuantity <= 0) {

      alert('Target Quantity Must Be Greater Than Zero');

      return;

    }

  }

  // ==========================
  // Total Target Validation
  // ==========================

  const totalTarget = this.sewingPlan.targets
    .reduce(
      (sum, item) => sum + item.targetQuantity,
      0
    );

  if (
    this.selectedPlan &&
    totalTarget > this.selectedPlan.actualCutPieces
  ) {

    alert(
      'Total Target Quantity Cannot Exceed Received Quantity'
    );

    return;

  }

    if (this.isEdit) {

      this.update();

    } else {

      this.create();

    }

  }

  create(): void {

    this.loading = true;

    this.service
      .create(this.sewingPlan)
      .subscribe({

        next: () => {

          this.loading = false;

          this.router.navigate(['/sewing-plan']);

        },

        error: err => {

          console.error(err);

          this.loading = false;

        }

      });

  }

  update(): void {

    if (!this.id) return;

    this.loading = true;

    this.service
      .update(this.id, this.sewingPlan)
      .subscribe({

        next: () => {

          this.loading = false;

          this.router.navigate(['/sewing-plan']);

        },

        error: err => {

          console.error(err);

          this.loading = false;

        }

      });

  }

  // =====================================
  // Edit
  // =====================================

  loadById(): void {

    if (!this.id) return;

    this.loading = true;

    this.service
      .getById(this.id)
      .subscribe({

        next: (res: SewingPlanResponse) => {

          this.selectedPlan = undefined;

          this.sewingPlan = {

            cuttingPlanId: res.cuttingPlanId,

            startDate: res.startDate,

            endDate: res.endDate,

            targets: res.targets.map(t => ({

              productionLineId: t.productionLineId,

              targetQuantity: t.targetQuantity

            }))

          };

          this.onCuttingPlanChange();

          this.loading = false;

        },

        error: err => {

          console.error(err);

          this.loading = false;

        }

      });

  }

  cancel(): void {

    this.router.navigate(['/sewing-plan']);

  }


  // =====================================
// Total Allocated Qty
// =====================================

getTotalAllocated(): number {

  return this.sewingPlan.targets.reduce(

    (sum, item) => sum + (item.targetQuantity || 0),

    0

  );

}

// =====================================
// Remaining Qty
// =====================================

getRemainingQty(): number {

  if (!this.selectedPlan) {

    return 0;

  }

  return this.selectedPlan.actualCutPieces
    - this.getTotalAllocated();

}

// =====================================
// Allocation Percentage
// =====================================

getAllocationPercentage(): number {

  if (!this.selectedPlan) {

    return 0;

  }

  if (this.selectedPlan.actualCutPieces === 0) {

    return 0;

  }

  return (

    this.getTotalAllocated()

    / this.selectedPlan.actualCutPieces

  ) * 100;

}




}
