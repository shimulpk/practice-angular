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

  rmcList: RmcCheckResponse[] = [];
  loading = false;

  constructor(
    private rmcService: RmcCheckService,
    private cdr: ChangeDetectorRef
  ) {}

  
  ngOnInit(): void {
   this.loadAllRmc();
  }


  // ==========================
  // Load All RMC Checks
  // ==========================
  loadAllRmc(): void {
    this.loading = true;
    this.rmcService.getAll().subscribe({
      next: (response) => {
        this.rmcList = response;
        this.loading = false;
        console.log(response);
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading RMC list:', error);
        this.loading = false;
      },
    });
  }


  // ==========================
  // Delete RMC Check
  // ==========================
  deleteRmc(id: number): void {
    if (confirm('Are you sure you want to delete this Raw Material Check?')) {
      this.rmcService.delete(id).subscribe({
        next: (response) => {
          alert(response || 'RMC Check Deleted Successfully');
          // Delete houa item list theke filter kore fele deoa
          this.rmcList = this.rmcList.filter((item) => item.id !== id);
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('Error deleting RMC:', error);
          alert('Failed to delete RMC Check');
        },
      });
    }


  }



}
