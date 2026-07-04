import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StyleResponse } from '../../models/style-response';
import { StyleService } from '../../services/style.service';

@Component({
  selector: 'app-style-details',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './style-details.html',
  styleUrl: './style-details.css',
})
export class StyleDetails implements OnInit{

  style?: StyleResponse;

  loading = false;

  constructor(

    private styleService: StyleService,

    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef

  ) { }

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (id) {

      this.loadStyle(id);

    }

  }

  loadStyle(id: number): void {

    this.loading = true;

    this.styleService.getById(id).subscribe({

      next: (response) => {

        this.style = response;

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
