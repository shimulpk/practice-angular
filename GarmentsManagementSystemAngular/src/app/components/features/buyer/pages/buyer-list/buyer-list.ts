import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BuyerService } from '../../services/buyer.service';
import { BuyerResponse } from '../../models/buyer-response';

@Component({
  selector: 'app-buyer-list',
  imports: [CommonModule,RouterModule],
  standalone:true,
  templateUrl: './buyer-list.html',
  styleUrl: './buyer-list.css',
})
export class BuyerList implements OnInit{

  private buyerService = inject(BuyerService);

   buyers: BuyerResponse[] = [];

    loading = false;


  ngOnInit(): void {
    this.loadBuyers();
  }

   loadBuyers(): void {

    this.loading = true;

    this.buyerService.getAll().subscribe({

      next: (response) => {
        this.buyers = response;
        this.loading = false;
      },

      error: (error) => {
        console.error(error);
        this.loading = false;
      }

    });
  }

  deleteBuyer(id: number): void {

    if (!confirm('Are you sure you want to delete this buyer?')) {
      return;
    }

    this.buyerService.delete(id).subscribe({

      next: () => {
        this.loadBuyers();
      },

      error: (error) => {
        console.error(error);
      }

    });

  }


  
}
