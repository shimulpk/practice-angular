import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { StoreRequisitionResponse } from '../../../../inventory/store-requisition/models/store-requisition-response';
import { PendingStoreRequisitionService } from '../../services/pending-store-requisition.service';

@Component({
  selector: 'app-pending-store-requisition-list',
 standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './pending-store-requisition-list.html',
  styleUrl: './pending-store-requisition-list.css',
})
export class PendingStoreRequisitionList implements OnInit{

   requisitions: StoreRequisitionResponse[] = [];

  filteredRequisitions: StoreRequisitionResponse[] = [];

  searchText = '';

  loading = false;

  constructor(
    private pendingStoreRequisitionService: PendingStoreRequisitionService,
    private router: Router,
    private cdr:ChangeDetectorRef
  ) { }


  ngOnInit(): void {
     this.loadPendingRequisitions();
  }

// ===========================
  // Load Pending Requisitions
  // ===========================

  loadPendingRequisitions(): void {

    this.loading = true;

    this.pendingStoreRequisitionService
      .getPending()
      .subscribe({

        next: (response) => {

          this.requisitions = response;

          this.filteredRequisitions = response;

          this.loading = false;
          this.cdr.markForCheck();

        },

        error: err => {

          console.error(err);

          this.loading = false;
          this.cdr.markForCheck();

        }

      });

  }

  // ===========================
  // Search
  // ===========================

  search(): void {

    const value =
      this.searchText
        .toLowerCase()
        .trim();

    this.filteredRequisitions =
      this.requisitions.filter(x =>

        x.prNo.toLowerCase().includes(value)

        ||

        x.requestedBy.toLowerCase().includes(value)

        ||

        x.department.toLowerCase().includes(value)

      );

  }

  // ===========================
  // View
  // ===========================

  view(id: number): void {

    this.router.navigate([
      '/pending-store-requisition/view',
      id
    ]);

  }

  // ===========================
  // Approve
  // ===========================

  approve(id: number): void {

    if (!confirm('Approve this Store Requisition?')) {

      return;

    }

    this.pendingStoreRequisitionService
      .approve(id)
      .subscribe({

        next: () => {

          alert('Store Requisition Approved Successfully');

          this.loadPendingRequisitions();

        },

        error: err => {

          console.error(err);

        }

      });

  }

  // ===========================
  // Reject
  // ===========================

  reject(id: number): void {

    if (!confirm('Reject this Store Requisition?')) {

      return;

    }

    this.pendingStoreRequisitionService
      .reject(id)
      .subscribe({

        next: () => {

          alert('Store Requisition Rejected Successfully');

          this.loadPendingRequisitions();

        },

        error: err => {

          console.error(err);

        }

      });

  }


}
