import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductionLineResponse } from '../../models/production-line-response';
import { ProductionLineService } from '../../services/production-line.service';

@Component({
  selector: 'app-production-line-list',
   standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './production-line-list.html',
  styleUrl: './production-line-list.css',
})
export class ProductionLineList implements OnInit{

   productionLines: ProductionLineResponse[] = [];

  filteredProductionLines: ProductionLineResponse[] = [];

  searchText = '';

  loading = false;

  constructor(
    private productionLineService: ProductionLineService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
     this.loadProductionLines();
  }

  loadProductionLines(): void {

    this.loading = true;

    this.productionLineService
      .getAll()
      .subscribe({

        next: (response) => {

          this.productionLines = response;

          this.filteredProductionLines = response;

          this.loading = false;
          this.cdr.markForCheck();

        },

        error: (error) => {

          console.error(error);

          this.loading = false;

        }

      });

  }

  search(): void {

    const keyword = this.searchText
      .trim()
      .toLowerCase();

    if (!keyword) {

      this.filteredProductionLines = this.productionLines;

      return;

    }

    this.filteredProductionLines = this.productionLines.filter(line =>

      line.lineId.toLowerCase().includes(keyword) ||

      line.supervisor.toLowerCase().includes(keyword)

    );

  }

  edit(id: number): void {

    this.router.navigate(
      ['/production-lines/edit', id]
    );

  }

  delete(id: number): void {

    if (!confirm('Are you sure you want to delete this production line?')) {

      return;

    }

    this.productionLineService
      .delete(id)
      .subscribe({

        next: () => {

          this.loadProductionLines();

        },

        error: (error) => {

          console.error(error);

        }

      });

  }



}
