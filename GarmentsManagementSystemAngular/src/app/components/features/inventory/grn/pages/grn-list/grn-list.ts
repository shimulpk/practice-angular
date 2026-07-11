import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GoodsReceiveNoteResponse } from '../../models/goods-receive-note-response';
import { GoodsReceiveNoteService } from '../../services/goods-receive-note.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-grn-list',
   standalone: true,
  imports: [ CommonModule,RouterModule,FormsModule],
  templateUrl: './grn-list.html',
  styleUrl: './grn-list.css',
})
export class GrnList implements OnInit{

   grns: GoodsReceiveNoteResponse[] = [];

  filteredGrns: GoodsReceiveNoteResponse[] = [];

  searchText = '';

  loading = false;

  constructor(
    private grnService: GoodsReceiveNoteService,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
     this.loadGrns();
  }

 // =====================================
  // Load All GRNs
  // =====================================

  loadGrns(): void {

    this.loading = true;

    this.grnService.getAll().subscribe({

      next: (response) => {

        this.grns = response;

        this.filteredGrns = response;

        this.loading = false;

        this.cdr.markForCheck();

      },

      error: (error) => {

        console.error(error);

        this.loading = false;

      }

    });

  }

  // =====================================
  // Search
  // =====================================

  search(): void {

    const keyword = this.searchText
      .trim()
      .toLowerCase();

    if (!keyword) {

      this.filteredGrns = this.grns;

      return;

    }

    this.filteredGrns = this.grns.filter(grn =>

      grn.grnNo.toLowerCase().includes(keyword) ||

      grn.poNo.toLowerCase().includes(keyword) ||

      grn.challanNo?.toLowerCase().includes(keyword)

    );

  }

  // =====================================
  // Refresh
  // =====================================

  refresh(): void {

    this.searchText = '';

    this.loadGrns();

  }

  // =====================================
  // Track By
  // =====================================

  trackById(index: number,
    item: GoodsReceiveNoteResponse): number {

    return item.id;

  }

}
