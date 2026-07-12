import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SewingPlanResponse } from '../../models/sewing-plan-response';
import { SewingPlanService } from '../../services/sewing-plan.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sewing-plan-details',
   standalone: true,
  imports: [CommonModule],
  templateUrl: './sewing-plan-details.html',
  styleUrl: './sewing-plan-details.css',
})
export class SewingPlanDetails implements OnInit{

    id!: number;

  loading = false;

  sewingPlan?: SewingPlanResponse;

  constructor(

    private service: SewingPlanService,

    private route: ActivatedRoute,

    private router: Router,
    private cdr: ChangeDetectorRef

  ) { }


  ngOnInit(): void {
     this.id = Number(

      this.route.snapshot.paramMap.get('id')

    );

    this.loadData();

  }


   // ===========================
  // Load Sewing Plan
  // ===========================

  loadData(): void {

    this.loading = true;

    this.service
      .getById(this.id)
      .subscribe({

        next: (response) => {

          this.sewingPlan = response;

          this.loading = false;
          this.cdr.markForCheck();

        },

        error: (error) => {

          console.error(error);

          this.loading = false;

        }

      });

  }

  // ===========================
  // Progress %
  // ===========================

  getProgress(): number {

    if (!this.sewingPlan) {

      return 0;

    }

    if (this.sewingPlan.inputReceivedQty === 0) {

      return 0;

    }

    return (

      this.sewingPlan.outputQty

      / this.sewingPlan.inputReceivedQty

    ) * 100;

  }

  // ===========================
  // Remaining Qty
  // ===========================

  getRemaining(): number {

    if (!this.sewingPlan) {

      return 0;

    }

    return (

      this.sewingPlan.inputReceivedQty

      - this.sewingPlan.outputQty

    );

  }

  // ===========================
  // Add Day Wise Production
  // ===========================

  addProduction(): void {

    this.router.navigate(

      [

        '/day-wise-sewing-production/add'

      ],

      {

        queryParams: {

          sewingPlanId: this.id

        }

      }

    );

  }

  // ===========================
  // Back
  // ===========================

  back(): void {

    this.router.navigate([

      '/cutting-plan'

    ]);

  }

}
