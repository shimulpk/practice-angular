import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UomResponse } from '../../models/uom-response';
import { UomService } from '../../services/uom.service';

@Component({
  selector: 'app-uom-details',
    standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './uom-details.html',
  styleUrl: './uom-details.css',
})
export class UomDetails implements OnInit{

   uom?: UomResponse;

  loading = false;

  constructor(
    private uomService: UomService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
    
  ) { }

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (id) {

      this.loadUom(id);

    }

  }

  loadUom(id: number): void {

    this.loading = true;

    this.uomService.getById(id).subscribe({

      next: (response) => {

        this.uom = response;

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
