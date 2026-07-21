import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DayWisePackingProductionResponse } from '../../models/day-wise-packing-production-response';
import { DayWisePackingProductionService } from '../../services/day-wise-packing-production.service';

@Component({
  selector: 'app-day-wise-packing-production-list',
   standalone: true,
  imports: [ CommonModule,FormsModule, RouterModule],
  templateUrl: './day-wise-packing-production-list.html',
  styleUrl: './day-wise-packing-production-list.css',
})
export class DayWisePackingProductionList implements OnInit{

 productions: DayWisePackingProductionResponse[] = [];

  filteredProductions: DayWisePackingProductionResponse[] = [];

  loading = false;

  searchText = '';

  constructor(
    private productionService: DayWisePackingProductionService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.loadProductions();

  }

  loadProductions(): void {

    this.loading = true;

    this.productionService
      .getAll()
      .subscribe({

        next: (response) => {

          this.productions = response;

          this.filteredProductions = response;

          this.loading = false;

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(error);

          this.loading = false;

        }

      });

  }

  search(): void {

    const value = this.searchText.toLowerCase();

    this.filteredProductions =
      this.productions.filter(production =>

        production.packingPlanCode.toLowerCase().includes(value) ||

        production.buyerName.toLowerCase().includes(value) ||

        production.orderNo.toLowerCase().includes(value) ||

        production.styleNo.toLowerCase().includes(value)

      );

  }

  addNew(): void {

    this.router.navigate([
      '/day-wise-packing-productions/add'
    ]);

  }

  view(id: number): void {

    this.router.navigate([
      '/day-wise-packing-productions/view',
      id
    ]);

  }

  edit(id: number): void {

    this.router.navigate([
      '/day-wise-packing-productions/edit',
      id
    ]);

  }

  delete(id: number): void {

    if (!confirm('Delete this production?')) {
      return;
    }

    this.productionService
      .delete(id)
      .subscribe({

        next: () => {

          this.loadProductions();

        },

        error: (error) => {

          console.error(error);

        }

      });

  }
}
