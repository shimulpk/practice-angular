import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CuttingDashboardResponse } from '../../models/cutting-dashboard-response';
import { CuttingDashboardService } from '../../services/cutting-dashboard.service';

@Component({
  selector: 'app-cutting-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cutting-dashboard.html',
  styleUrl: './cutting-dashboard.css',
})
export class CuttingDashboard implements OnInit{

today = new Date(); 
loading = false;
 dashboard?: CuttingDashboardResponse;
  constructor( private cuttingDashboardService: CuttingDashboardService,
     private cdr: ChangeDetectorRef 
    ) {} 
    ngOnInit(): void { 
      this.loadDashboard(); } 

      private loadDashboard(): void {
         this.loading = true; 
         this.cuttingDashboardService .getDashboard() .subscribe({
           next: (response) => {
             this.dashboard = response;
              this.loading = false;
               this.cdr.markForCheck();
               }, 
               error: (error) => {
                 console.error(error); 
                 this.loading = false; 
                 this.cdr.markForCheck();
                 } }); }
}
