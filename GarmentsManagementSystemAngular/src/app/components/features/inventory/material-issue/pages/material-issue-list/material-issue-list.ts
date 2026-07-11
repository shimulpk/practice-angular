import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MaterialIssueResponse } from '../../models/material-issue-response';
import { MaterialIssueService } from '../../services/material-issue.service';

@Component({
  selector: 'app-material-issue-list',
    standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './material-issue-list.html',
  styleUrl: './material-issue-list.css',
})
export class MaterialIssueList implements OnInit{


    materialIssues: MaterialIssueResponse[] = [];

  loading = false;

  constructor(
    private materialIssueService: MaterialIssueService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    this.loadMaterialIssues();
  }

   // ==========================
  // Load Material Issues
  // ==========================

  loadMaterialIssues(): void {

    this.loading = true;

    this.materialIssueService
      .getAll()
      .subscribe({

        next: (response) => {

          this.materialIssues = response;

          this.loading = false;
          this.cdr.markForCheck();

        },

        error: (error) => {

          console.error(error);

          this.loading = false;

        }

      });

  }

  // ==========================
  // View Details
  // ==========================

  viewDetails(id: number): void {

    this.router.navigate(['/material-issue', id]);

  }

  // ==========================
  // Create Material Issue
  // ==========================

  create(): void {

    this.router.navigate(['/material-issue/create']);

  }

}
