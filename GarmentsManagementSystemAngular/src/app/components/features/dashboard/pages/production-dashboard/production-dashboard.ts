import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductionDashboardResponse } from '../../models/production-dashboard-response';
import { ProductionDashboardService } from '../../services/production-dashboard.service';

@Component({
  selector: 'app-production-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './production-dashboard.html',
  styleUrl: './production-dashboard.css',
})
export class ProductionDashboard implements OnInit{

today = new Date();

  loading = false;

  dashboard?: ProductionDashboardResponse;

  constructor(
    private productionDashboardService: ProductionDashboardService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  private loadDashboard(): void {

    this.loading = true;

    this.productionDashboardService
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
