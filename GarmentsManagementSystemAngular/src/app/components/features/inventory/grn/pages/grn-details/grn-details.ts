import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GoodsReceiveNoteResponse } from '../../models/goods-receive-note-response';
import { GoodsReceiveNoteService } from '../../services/goods-receive-note.service';

@Component({
  selector: 'app-grn-details',
   standalone: true,
  imports: [ CommonModule,RouterModule],
  templateUrl: './grn-details.html',
  styleUrl: './grn-details.css',
})
export class GrnDetails implements OnInit{

  grn?: GoodsReceiveNoteResponse;

  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private grnService: GoodsReceiveNoteService,
    private cdr:ChangeDetectorRef
  ) { }


  ngOnInit(): void {
   this.loadDetails();
  }

// =====================================
  // Load Details
  // =====================================

  loadDetails(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (!id) {

      this.router.navigate(['/inventory/grn']);

      return;

    }

    this.loading = true;

    this.grnService.getById(id).subscribe({

      next: (response) => {

        this.grn = response;

        this.loading = false;
        this.cdr.markForCheck();

      },

      error: (error) => {

        console.error(error);

        this.loading = false;

        this.router.navigate(['/inventory/grn']);

      }

    });

  }

  // =====================================
  // Back
  // =====================================

  back(): void {

    this.router.navigate(['/inventory/grn']);

  }

  // =====================================
  // Grand Total
  // =====================================

  get grandTotal(): number {

    if (!this.grn) {

      return 0;

    }

    return this.grn.items.reduce(
      (sum, item) => sum + item.lineTotal,
      0
    );

  }

}
