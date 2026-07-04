import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BuyerService } from '../../services/buyer.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BuyerResponse } from '../../models/buyer-response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buyer-details',
   standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './buyer-details.html',
  styleUrl: './buyer-details.css',
})
export class BuyerDetails implements OnInit{

  buyer?: BuyerResponse;

  loading = false;

  constructor(
    private buyerService: BuyerService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.loadBuyer(id);
    }

  }

  loadBuyer(id: number): void {

    this.loading = true;

    this.buyerService.getById(id).subscribe({

      next: (response) => {

        this.buyer = response;
        this.loading = false;
        this.cdr.detectChanges();

      },

      error: (error) => {

        console.error(error);
        this.loading = false;

      }

    });

  }
}
