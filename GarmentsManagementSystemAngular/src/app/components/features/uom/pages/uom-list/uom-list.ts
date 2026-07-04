import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UomResponse } from '../../models/uom-response';
import { UomService } from '../../services/uom.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-uom-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './uom-list.html',
  styleUrl: './uom-list.css',
})
export class UomList implements OnInit {


   uoms: UomResponse[] = [];

  loading = false;

  constructor(
    private uomService: UomService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.loadUoms();

  }

  loadUoms(): void {

    this.loading = true;

    this.uomService.getAll().subscribe({

      next: (response) => {

        this.uoms = response;

        this.loading = false;
       this.cdr.detectChanges();

      },

      error: (error) => {

        console.error(error);

        this.loading = false;

      }

    });

  }

  deleteUom(id: number): void {

    const confirmDelete = confirm(
      'Are you sure you want to delete this UOM?'
    );

    if (!confirmDelete) {
      return;
    }

    this.uomService.delete(id).subscribe({

      next: () => {

        this.loadUoms();

      },

      error: (error) => {

        console.error(error);

      }

    });

  }
}
