import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SewingDashboardResponse } from '../../models/sewing-dashboard-response';
import { SewingDashboardService } from '../../services/sewing-dashboard.service';

@Component({
  selector: 'app-sewing-dashboard',
    standalone: true,
  imports: [CommonModule],
  templateUrl: './sewing-dashboard.html',
  styleUrl: './sewing-dashboard.css',
})
export class SewingDashboard implements OnInit{


    today = new Date();

  loading = false;

  dashboard?: SewingDashboardResponse;

  constructor(
    private sewingDashboardService: SewingDashboardService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  private loadDashboard(): void {

    this.loading = true;

    this.sewingDashboardService
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
