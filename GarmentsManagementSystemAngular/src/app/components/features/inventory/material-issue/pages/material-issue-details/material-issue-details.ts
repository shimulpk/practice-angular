import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MaterialIssueResponse } from '../../models/material-issue-response';
import { MaterialIssueService } from '../../services/material-issue.service';

@Component({
  selector: 'app-material-issue-details',
   standalone: true,
  imports: [ CommonModule, RouterModule],
  templateUrl: './material-issue-details.html',
  styleUrl: './material-issue-details.css',
})
export class MaterialIssueDetails implements OnInit{


    materialIssue?: MaterialIssueResponse;

  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private materialIssueService: MaterialIssueService,
    private cdr:ChangeDetectorRef
  ) { }


  ngOnInit(): void {
  const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {

      this.loadMaterialIssue(id);

    }
  }

   // ==========================
  // Load Material Issue
  // ==========================

  loadMaterialIssue(id: number): void {

    this.loading = true;

    this.materialIssueService
      .getById(id)
      .subscribe({

        next: (response) => {

          this.materialIssue = response;

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
  // Back
  // ==========================

  back(): void {

    this.router.navigate(['/material-issue']);

  }

}
