import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StoreDashboardResponse } from '../../models/store-dashboard-response';
import { StoreDashboardService } from '../../services/store-dashboard.service';

@Component({
  selector: 'app-store-dashboard',
   standalone: true,
  imports: [CommonModule],
  templateUrl: './store-dashboard.html',
  styleUrl: './store-dashboard.css',
})
export class StoreDashboard implements OnInit{

   today = new Date();

  loading = false;

  dashboard?: StoreDashboardResponse;

  constructor(
    private storeDashboardService: StoreDashboardService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  private loadDashboard(): void {

    this.loading = true;

    this.storeDashboardService
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
