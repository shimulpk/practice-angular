import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PurchaseDashboardResponse } from '../../models/purchase-dashboard-response';
import { PurchaseDashboardService } from '../../services/purchase-dashboard.service';

@Component({
  selector: 'app-purchase-dashboard',
   standalone: true,
  imports: [CommonModule],
  templateUrl: './purchase-dashboard.html',
  styleUrl: './purchase-dashboard.css',
})
export class PurchaseDashboard implements OnInit{

   today = new Date();

  loading = false;

  dashboard?: PurchaseDashboardResponse;

  constructor(
    private purchaseDashboardService: PurchaseDashboardService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  private loadDashboard(): void {

    this.loading = true;

    this.purchaseDashboardService
      .getDashboard()
      .subscribe({

        next: (response) => {

          this.dashboard = response;

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



}
