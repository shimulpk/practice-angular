import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StoreRequisitionResponse } from '../../../../inventory/store-requisition/models/store-requisition-response';
import { PendingStoreRequisitionService } from '../../services/pending-store-requisition.service';

@Component({
  selector: 'app-pending-store-requisition-details',
   standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './pending-store-requisition-details.html',
  styleUrl: './pending-store-requisition-details.css',
})
export class PendingStoreRequisitionDetails implements OnInit{

   requisition?: StoreRequisitionResponse;

  loading = false;

  constructor(
    private pendingStoreRequisitionService: PendingStoreRequisitionService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr:ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    const id =
      Number(
        this.route.snapshot.paramMap.get('id')
      );

    if (id) {

      this.loadRequisition(id);

    }

  }

   // ==================================
  // Load Requisition
  // ==================================

  loadRequisition(id: number): void {

    this.loading = true;

    this.pendingStoreRequisitionService
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
  // Approve
  // ==================================

  approve(): void {

    if (!this.requisition) {

      return;

    }

    if (!confirm('Approve this Store Requisition?')) {

      return;

    }

    this.pendingStoreRequisitionService
      .approve(this.requisition.id)
      .subscribe({

        next: () => {

          alert('Store Requisition Approved Successfully');

          this.router.navigate([
            '/pending-store-requisition'
          ]);

        },

        error: err => {

          console.error(err);

        }

      });

  }

  // ==================================
  // Reject
  // ==================================

  reject(): void {

    if (!this.requisition) {

      return;

    }

    if (!confirm('Reject this Store Requisition?')) {

      return;

    }

    this.pendingStoreRequisitionService
      .reject(this.requisition.id)
      .subscribe({

        next: () => {

          alert('Store Requisition Rejected Successfully');

          this.router.navigate([
            '/pending-store-requisition'
          ]);

        },

        error: err => {

          console.error(err);

        }

      });

  }



}
