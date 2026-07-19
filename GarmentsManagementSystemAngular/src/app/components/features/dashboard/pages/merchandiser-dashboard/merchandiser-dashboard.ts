import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MerchandiserDashboardResponse } from '../../models/merchandiser-dashboard-response';
import { MerchandiserDashboardService } from '../../services/merchandiser-dashboard.service';

@Component({
  selector: 'app-merchandiser-dashboard',
   standalone: true,
  imports: [CommonModule],
  templateUrl: './merchandiser-dashboard.html',
  styleUrl: './merchandiser-dashboard.css',
})
export class MerchandiserDashboard implements OnInit{

    today = new Date();

  loading = false;

  dashboard?: MerchandiserDashboardResponse;

  constructor(
    private merchandiserDashboardService: MerchandiserDashboardService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  private loadDashboard(): void {

    this.loading = true;

    this.merchandiserDashboardService
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
