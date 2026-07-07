import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FabricCheckResponse } from '../../models/fabric-check-response';
import { FabricRecordService } from '../../services/fabric-record.service';

@Component({
  selector: 'app-fabric-record-list',
   standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './fabric-record-list.html',
  styleUrl: './fabric-record-list.css',
})
export class FabricRecordList implements OnInit{


    records: FabricCheckResponse[] = [];

  loading = false;

  constructor(
    private fabricService: FabricRecordService,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    this.loadRecords();
  }

   // ==========================
  // Load Fabric Records
  // ==========================

  loadRecords(): void {

    this.loading = true;

    this.fabricService
      .getAll()
      .subscribe({

        next: (response) => {

          this.records = response;

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
  // Delete
  // ==========================

  deleteRecord(id: number): void {

    if (!confirm('Are you sure you want to delete this Fabric Record?')) {

      return;

    }

    this.fabricService
      .delete(id)
      .subscribe({

        next: () => {

          alert('Fabric Record Deleted Successfully');

          this.loadRecords();

        },

        error: (error) => {

          console.error(error);

        }

      });

}
}
