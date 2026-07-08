import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { VendorResponse } from '../../models/vendor-response';
import { VendorService } from '../../services/vendor.service';

@Component({
  selector: 'app-vendor-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './vendor-list.html',
  styleUrl: './vendor-list.css',
})
export class VendorList implements OnInit{

   vendors: VendorResponse[] = [];

  loading = false;

  constructor(
    private vendorService: VendorService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
   this.loadVendors();
  }

   // ===========================
  // Load Vendors
  // ===========================

  loadVendors(): void {

    this.loading = true;

    this.vendorService
      .getAll()
      .subscribe({

        next: (response) => {

          this.vendors = response;

          this.loading = false;
          this.cdr.detectChanges();

        },

        error: (err) => {

          console.error(err);

          this.loading = false;

        }

      });

  }

  // ===========================
  // Edit
  // ===========================

  editVendor(id: number): void {

    this.router.navigate([
      '/vendors/edit',
      id
    ]);

  }

  // ===========================
  // Delete
  // ===========================

  deleteVendor(id: number): void {

    if (!confirm('Are you sure to delete this Vendor?')) {

      return;

    }

    this.vendorService
      .delete(id)
      .subscribe({

        next: () => {

          alert('Vendor Deleted Successfully');

          this.loadVendors();

        },

        error: err => console.error(err)

      });

  }


}
