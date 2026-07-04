import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StyleResponse } from '../../models/style-response';
import { StyleService } from '../../services/style.service';

@Component({
  selector: 'app-style-list',
   standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './style-list.html',
  styleUrl: './style-list.css',
})
export class StyleList implements OnInit{

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
        this.cdr.detectChanges();

      },

      error: (error) => {

        console.error(error);

        this.loading = false;
        this.cdr.detectChanges();

      }

    });

  }

  deleteStyle(id: number): void {

    if (!confirm('Are you sure you want to delete this Style?')) {

      return;

    }

    this.styleService.delete(id).subscribe({

      next: () => {

        this.loadStyles();

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

}
