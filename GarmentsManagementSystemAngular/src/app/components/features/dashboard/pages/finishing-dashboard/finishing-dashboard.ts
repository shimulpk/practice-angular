import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FinishingDashboardResponse } from '../../models/finishing-dashboard-response';
import { FinishingDashboardService } from '../../services/finishing-dashboard.service';

@Component({
  selector: 'app-finishing-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finishing-dashboard.html',
  styleUrl: './finishing-dashboard.css',
})
export class FinishingDashboard implements OnInit{

  today = new Date();

  loading = false;

  dashboard?: FinishingDashboardResponse;

  constructor(
    private finishingDashboardService: FinishingDashboardService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  private loadDashboard(): void {

    this.loading = true;

    this.finishingDashboardService
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
