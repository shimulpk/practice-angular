import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreRequisitionService } from '../../services/store-requisition.service';
import { StoreRequisitionResponse } from '../../models/store-requisition-response';


@Component({
  selector: 'app-store-requisition-list',
    standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './store-requisition-list.html',
  styleUrl: './store-requisition-list.css',
})
export class StoreRequisitionList implements OnInit{

   requisitions: StoreRequisitionResponse[] = [];

  filteredRequisitions: StoreRequisitionResponse[] = [];

  searchText = '';

  loading = false;

  constructor(
    private storeRequisitionService: StoreRequisitionService,
    private router: Router,
    private cdr:ChangeDetectorRef
  ) { }


  ngOnInit(): void {
      this.loadStoreRequisitions();
  }

  // ===========================
  // Load All
  // ===========================

  loadStoreRequisitions(): void {

    this.loading = true;

    this.storeRequisitionService
      .getAll()
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

  viewRequisition(id: number): void {

    this.router.navigate([
      '/store-requisition/view',
      id
    ]);

  }

  // ===========================
  // Edit
  // ===========================

  editRequisition(id: number): void {

    this.router.navigate([
      '/store-requisition/edit',
      id
    ]);

  }

  // ===========================
  // Delete
  // ===========================

  deleteRequisition(id: number): void {

    const ok =
      confirm(
        'Are you sure you want to delete this Store Requisition?'
      );

    if (!ok) {

      return;

    }

    this.storeRequisitionService
      .delete(id)
      .subscribe({

        next: () => {

          alert(
            'Store Requisition Deleted Successfully'
          );

          this.loadStoreRequisitions();

        },

        error: err => {

          console.error(err);

        }

      });

  }
}
