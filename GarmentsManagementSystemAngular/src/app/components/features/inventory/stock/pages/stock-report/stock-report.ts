import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StockResponse } from '../../models/stock-response';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-stock-report',
   standalone: true,
  imports: [ CommonModule,FormsModule],
  templateUrl: './stock-report.html',
  styleUrl: './stock-report.css',
})
export class StockReport implements OnInit{

    stocks: StockResponse[] = [];

  filteredStocks: StockResponse[] = [];

  loading = false;

  searchText = '';

  constructor(
    private stockService: StockService,
    private cdr:ChangeDetectorRef
  ) { }


  ngOnInit(): void {
      this.loadStocks();
  }

   // ==========================
  // Load Stocks
  // ==========================

  loadStocks(): void {

    this.loading = true;

    this.stockService
      .getAll()
      .subscribe({

        next: (response) => {

          this.stocks = response;

          this.filteredStocks = response;

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
  // Search
  // ==========================

  search(): void {

    const keyword = this.searchText
      .trim()
      .toLowerCase();

    if (!keyword) {

      this.filteredStocks = this.stocks;

      return;

    }

    this.filteredStocks = this.stocks.filter(stock =>

      stock.itemName.toLowerCase().includes(keyword) ||

      stock.category.toLowerCase().includes(keyword)

    );

  }

  // ==========================
  // Summary
  // ==========================

  getTotalItems(): number {

    return this.filteredStocks.length;

  }

  getTotalAvailableQuantity(): number {

    return this.filteredStocks.reduce(

      (total, stock) => total + stock.availableQuantity,

      0

    );

  }

  // ==========================
  // Low Stock
  // ==========================

  isLowStock(stock: StockResponse): boolean {

    return stock.availableQuantity < 50;

  }


}
