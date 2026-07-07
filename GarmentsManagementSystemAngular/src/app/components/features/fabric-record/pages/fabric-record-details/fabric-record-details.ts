import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FabricCheckResponse } from '../../models/fabric-check-response';
import { FabricRecordService } from '../../services/fabric-record.service';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-fabric-record-details',
   standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './fabric-record-details.html',
  styleUrl: './fabric-record-details.css',
})
export class FabricRecordDetails implements OnInit{

  fabric?: FabricCheckResponse;

  loading = false;

  constructor(
    private fabricService: FabricRecordService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    const id =
      Number(this.route.snapshot.paramMap.get('id'));

    this.loadRecord(id);
  }

 // ==========================
  // Load Fabric Record
  // ==========================

  loadRecord(id: number): void {

    this.loading = true;

    this.fabricService.getById(id)
      .subscribe({

        next: (response) => {

          this.fabric = response;

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
// Print
// ==========================

printRecord(): void {

  window.print();

}

// ==========================
// PDF Download
// ==========================

downloadPdf(): void {

  const data =
    document.getElementById(
      'print-section'
    );

  if (!data) {

    return;

  }

  html2canvas(data, {

    scale: 2,

    useCORS: true

  }).then(canvas => {

    const pdf =
      new jsPDF(
        'p',
        'mm',
        'a4'
      );

    const imgData =
      canvas.toDataURL(
        'image/png'
      );

    const pdfWidth =
      pdf.internal.pageSize.getWidth();

    const pdfHeight =
      (canvas.height * pdfWidth)
      / canvas.width;

    pdf.addImage(

      imgData,

      'PNG',

      0,

      0,

      pdfWidth,

      pdfHeight

    );

    pdf.save(

      `Fabric-Record-${this.fabric?.orderCode}.pdf`

    );

  });

}


}
