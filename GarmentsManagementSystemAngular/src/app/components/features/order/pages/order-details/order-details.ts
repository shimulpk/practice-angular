import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { OrderResponse } from '../../models/order-response';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-order-details',
   standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './order-details.html',
  styleUrl: './order-details.css',
})
export class OrderDetails implements OnInit{

  order?: OrderResponse;

  loading = false;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    const id =
      Number(this.route.snapshot.paramMap.get('id'));

    this.loadOrder(id);

  }

   // ==========================
  // Load Order
  // ==========================

  loadOrder(id: number): void {

    this.loading = true;

    this.orderService.getById(id)
      .subscribe({

        next: (response) => {

          this.order = response;

          this.loading = false;
          this.cdr.markForCheck();

        },

        error: (error) => {

          console.error(error);

          this.loading = false;
          this.cdr.markForCheck();

        }

      });

  }

  printOrder(): void {

  window.print();

}

downloadPdf(): void {

  const data = document.getElementById('print-section');

  if (!data) {

    return;

  }

  html2canvas(data, {

    scale: 2,

    useCORS: true

  }).then(canvas => {

    const pdf = new jsPDF('p', 'mm', 'a4');

    const imgData = canvas.toDataURL('image/png');

    const pdfWidth =
      pdf.internal.pageSize.getWidth();

    const pdfHeight =
      (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(

      imgData,

      'PNG',

      0,

      0,

      pdfWidth,

      pdfHeight

    );

    pdf.save(

      `Order-${this.order?.orderId}.pdf`

    );

  });

}

  


 


}
