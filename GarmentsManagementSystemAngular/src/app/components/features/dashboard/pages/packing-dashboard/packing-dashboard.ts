import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PackingDashboardResponse } from '../../models/packing-dashboard-response';
import { PackingDashboardService } from '../../services/packing-dashboard.service';

@Component({
  selector: 'app-packing-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './packing-dashboard.html',
  styleUrl: './packing-dashboard.css',
})
export class PackingDashboard implements OnInit{

 today = new Date();

  loading = false;

  dashboard?: PackingDashboardResponse;

  constructor(
    private packingDashboardService: PackingDashboardService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  private loadDashboard(): void {

    this.loading = true;

    this.packingDashboardService
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
