import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RmcCheckResponse } from '../../models/rmc-check-response';
import { RmcCheckService } from '../../services/rmc-check.service';

@Component({
  selector: 'app-rmc-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './rmc-list.html',
  styleUrl: './rmc-list.css',
})
export class RmcList implements OnInit{

  rmcChecks: RmcCheckResponse[] = [];

  loading = false;

  constructor(
    private rmcService: RmcCheckService,
    private cdr: ChangeDetectorRef
  ) { }


    ngOnInit(): void {

    this.loadRmcChecks();

  }


  // Load All
  // ==========================

  loadRmcChecks(): void {

    this.loading = true;

    this.rmcService.getAll()
      .subscribe({

        next: (response) => {

          this.rmcChecks = response;

          this.loading = false;

          this.cdr.markForCheck();

        },

        error: (error) => {

          console.error(error);

          this.loading = false;

        }

      });

  }

  // ==========================
  // Delete
  // ==========================

  deleteRmc(id: number): void {

    if (!confirm('Are you sure you want to delete this RMC?')) {

      return;

    }

    this.rmcService.delete(id)
      .subscribe({

        next: () => {

          alert('RMC Deleted Successfully');

          this.loadRmcChecks();

        },

        error: (error) => {

          console.error(error);

        }

      });

  }



}
