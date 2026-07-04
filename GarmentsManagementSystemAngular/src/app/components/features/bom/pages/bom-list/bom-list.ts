import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StyleResponse } from '../../../style/models/style-response';
import { StyleService } from '../../../style/services/style.service';


@Component({
  selector: 'app-bom-list',
   standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './bom-list.html',
  styleUrl: './bom-list.css',
})
export class BomList implements OnInit{
 styles: StyleResponse[] = [];

  loading = false;

  constructor(
    private styleService: StyleService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.loadStyles();

  }

  loadStyles(): void {

    this.loading = true;

    this.styleService.getAll().subscribe({

      next: (response) => {

        this.styles = response;

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
