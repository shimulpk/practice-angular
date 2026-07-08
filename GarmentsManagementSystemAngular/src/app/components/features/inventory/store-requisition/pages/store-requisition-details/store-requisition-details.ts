import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StoreRequisitionResponse } from '../../models/store-requisition-response';
import { StoreRequisitionService } from '../../services/store-requisition.service';

@Component({
  selector: 'app-store-requisition-details',
   standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './store-requisition-details.html',
  styleUrl: './store-requisition-details.css',
})
export class StoreRequisitionDetails implements OnInit{

   requisition?: StoreRequisitionResponse;

  loading = false;

  constructor(
    private storeRequisitionService: StoreRequisitionService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
     const id =
      Number(
        this.route.snapshot.paramMap.get('id')
      );

    if (id) {

      this.loadStoreRequisition(id);

    }
  }

   // ==================================
  // Load Requisition
  // ==================================

  loadStoreRequisition(id: number): void {

    this.loading = true;

    this.storeRequisitionService
      .getById(id)
      .subscribe({

        next: (response) => {

          this.requisition = response;

          this.loading = false;
          this.cdr.markForCheck();

        },

        error: err => {

          console.error(err);

          this.loading = false;

        }

      });

  }

  // ==================================
  // Edit
  // ==================================

  editRequisition(): void {

    if (!this.requisition) {

      return;

    }

    this.router.navigate([
      '/store-requisition/edit',
      this.requisition.id
    ]);

  }

  
}
