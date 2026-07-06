import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RmcCheckResponse } from '../../models/rmc-check-response';
import { RmcCheckService } from '../../services/rmc-check.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-rmc-details',
   standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './rmc-details.html',
  styleUrl: './rmc-details.css',
})
export class RmcDetails implements OnInit{

   rmc?: RmcCheckResponse;

  loading = false;

  constructor(
    private rmcService: RmcCheckService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }



   ngOnInit(): void {

    const id =
      Number(this.route.snapshot.paramMap.get('id'));

    this.loadRmc(id);

  }


  // ==========================
  // Load RMC
  // ==========================

  loadRmc(id: number): void {

    this.loading = true;

    this.rmcService.getById(id)
      .subscribe({

        next: (response) => {

          this.rmc = response;

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

printReport(): void {

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

      `RMC-${this.rmc?.id}.pdf`

    );

  });

}

}
