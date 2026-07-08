import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ItemResponse } from '../../models/item-response';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-item-list',
    standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './item-list.html',
  styleUrl: './item-list.css',
})
export class ItemList implements OnInit {

  items: ItemResponse[] = [];

  filteredItems: ItemResponse[] = [];

  searchText = '';

  loading = false;

  constructor(
    private itemService: ItemService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
       this.loadItems();
  }


// ===========================
  // Load All Items
  // ===========================

  loadItems(): void {

    this.loading = true;

    this.itemService
      .getAll()
      .subscribe({

        next: (response) => {

          this.items = response;

          this.filteredItems = response;

          this.loading = false;
          this.cdr.markForCheck();

        },

        error: (err) => {

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

    const keyword =
      this.searchText
        .toLowerCase()
        .trim();

    this.filteredItems =
      this.items.filter(item =>

        item.itemName
          .toLowerCase()
          .includes(keyword)

        ||

        item.category
          .toLowerCase()
          .includes(keyword)

        ||

        item.unit
          .toLowerCase()
          .includes(keyword)

      );

  }

  // ===========================
  // Delete
  // ===========================

  deleteItem(id: number): void {

    if (!confirm('Are you sure to delete this Item?')) {

      return;

    }

    this.itemService
      .delete(id)
      .subscribe({

        next: () => {

          alert('Item Deleted Successfully');

          this.loadItems();

        },

        error: err => {

          console.error(err);

        }

      });

  }

  // ===========================
  // Edit
  // ===========================

  editItem(id: number): void {

    this.router.navigate([
      '/items/edit',
      id
    ]);

  }

  // ===========================
  // View
  // ===========================

  viewItem(id: number): void {

    this.router.navigate([
      '/items/view',
      id
    ]);

  }


}
