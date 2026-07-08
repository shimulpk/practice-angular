import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ItemResponse } from '../../models/item-response';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-item-details',
   standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './item-details.html',
  styleUrl: './item-details.css',
})
export class ItemDetails implements OnInit {


    item?: ItemResponse;

  loading = false;

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }
  ngOnInit(): void {
    const id =
      Number(this.route.snapshot.paramMap.get('id'));

    if (id) {

      this.loadItem(id);

    }

  }


    // ===========================
  // Load Item
  // ===========================

  loadItem(id: number): void {

    this.loading = true;

    this.itemService
      .getById(id)
      .subscribe({

        next: (response) => {

          this.item = response;

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
  // Edit
  // ===========================

  editItem(): void {

    if (!this.item) {

      return;

    }

    this.router.navigate([
      '/items/edit',
      this.item.id
    ]);

  }

}
