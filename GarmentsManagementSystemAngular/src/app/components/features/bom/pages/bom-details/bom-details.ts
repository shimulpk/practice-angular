import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BomResponse } from '../../models/bom-response';
import { BomService } from '../../services/bom.service';

@Component({
  selector: 'app-bom-details',
   standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './bom-details.html',
  styleUrl: './bom-details.css',
})
export class BomDetails implements OnInit{

    boms: BomResponse[] = [];

  loading = false;

  styleId = 0;

  constructor(
    private bomService: BomService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.styleId = Number(
      this.route.snapshot.paramMap.get('styleId')
    );

    this.loadBomItems();

  }

  loadBomItems(): void {

    this.loading = true;

    this.bomService.getByStyle(this.styleId)
      .subscribe({

        next: (response) => {

          this.boms = response;

          this.loading = false;
          this.cdr.markForCheck();

        },

        error: (error) => {

          console.error(error);

          this.loading = false;

        }

      });

  }

  deleteBom(id: number): void {

    if (!confirm('Delete this BOM Item?')) {

      return;

    }

    this.bomService.delete(id)
      .subscribe({

        next: () => {

          this.loadBomItems();

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

  get grandTotal(): number {

    return this.boms.reduce(

      (total, item) => total + Number(item.totalCost),

      0

    );

  }



}
