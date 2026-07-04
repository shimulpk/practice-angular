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

   bom?: BomResponse;

  loading = false;

  constructor(

    private bomService: BomService,

    private route: ActivatedRoute,

    private cdr: ChangeDetectorRef

  ) { }

  ngOnInit(): void {
    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (id) {

      this.loadBom(id);

    }
  }


    loadBom(id: number): void {

    this.loading = true;

    this.bomService.getById(id).subscribe({

      next: (response) => {

        this.bom = response;

        this.loading = false;

        this.cdr.markForCheck();

      },

      error: (error) => {

        console.error(error);

        this.loading = false;

      }

    });

  }


}
