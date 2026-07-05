import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BuyerResponse } from '../../../buyer/models/buyer-response';
import { StyleResponse } from '../../../style/models/style-response';
import { OrderService } from '../../services/order.service';
import { BuyerService } from '../../../buyer/services/buyer.service';
import { StyleService } from '../../../style/services/style.service';

@Component({
  selector: 'app-order-form',
   standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule, RouterModule],
  templateUrl: './order-form.html',
  styleUrl: './order-form.css',
})
export class OrderForm implements OnInit{

  orderForm!: FormGroup;

  buyers: BuyerResponse[] = [];

  styles: StyleResponse[] = [];

  loading = false;

  isEdit = false;

  orderId!: number;

  // ==========================
  // Fixed Sizes
  // ==========================

  readonly sizes = ['S', 'M', 'L', 'XL'];

  // ==========================
  // Dynamic Sections
  // ==========================

  showShortSleeve = false;

  showFullSleeve = false;

  shortSleeveRows: any[] = [];

  fullSleeveRows: any[] = [];

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private buyerService: BuyerService,
    private styleService: StyleService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
      this.createForm();

  this.loadBuyers();

  this.loadStyles();

  this.orderForm
    .get('buyerId')
    ?.valueChanges
    .subscribe(id => {

      this.onBuyerChange(id);

    });

  this.orderForm
    .get('styleId')
    ?.valueChanges
    .subscribe(id => {

      this.onStyleChange(id);

    });

  const id =
    this.route.snapshot.paramMap.get('id');

  if (id) {

    this.isEdit = true;

    this.orderId = +id;

    this.loadOrder(this.orderId);

  }


  }

  // ==========================================
  // Create Form
  // ==========================================

  createForm(): void {

   this.orderForm = this.fb.group({

    orderId: ['', Validators.required],

    poNumber: ['', Validators.required],

    buyerId: [null, Validators.required],

    styleId: [null, Validators.required],

    orderDate: ['', Validators.required],

    shipDate: ['', Validators.required],

    status: ['PENDING', Validators.required],

    shippingAddress: ['', Validators.required]

  });


  }

  
  // ==========================================
  // Load Dropdown Data
  // ==========================================

  loadBuyers(): void {

     this.buyerService
    .getAll()
    .subscribe({

      next: (data) => {

        this.buyers = data;

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.error(err);

      }

    });

  }

  loadStyles(): void {

   this.styleService
    .getAll()
    .subscribe({

      next: (data) => {

        this.styles = data;

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.error(err);

      }

    });


  }

  // Shipping Address auto fill buyer select e
  onBuyerChange(id: number): void {

  const buyer =
    this.buyers.find(b => b.id == id);

  if (!buyer) {

    return;

  }

  this.orderForm.patchValue({

    shippingAddress: buyer.address

  });

}


// Style Select show dynamic form
onStyleChange(id: number): void {

  const style =
    this.styles.find(s => s.id == id);

  if (!style) {

    return;

  }

  this.showShortSleeve = false;

  this.showFullSleeve = false;

  this.shortSleeveRows = [];

  this.fullSleeveRows = [];

  const styleName =
    style.styleName
      .toLowerCase()
      .trim();

  // ==========================
  // Short Sleeve
  // ==========================

  if (styleName.includes('short sleeve')) {

    this.showShortSleeve = true;

    this.shortSleeveRows =
      this.sizes.map(size => ({

        size,

        quantity: null,

        unitPrice: null

      }));

  }

  // ==========================
  // Full Sleeve / Long Sleeve
  // ==========================

  if (
    styleName.includes('full sleeve') ||
    styleName.includes('long sleeve')
  ) {

    this.showFullSleeve = true;

    this.fullSleeveRows =
      this.sizes.map(size => ({

        size,

        quantity: null,

        unitPrice: null

      }));

  }

  this.cdr.detectChanges();

}




  // ==========================================
  // Load Order
  // ==========================================

  loadOrder(id: number): void {

  this.loading = true;

  this.orderService
    .getById(id)
    .subscribe({

      next: (response) => {

        this.orderForm.patchValue({

          orderId: response.orderId,

          poNumber: response.poNumber,

          buyerId: response.buyerId,

          styleId: response.styleId,

          orderDate: response.orderDate,

          shipDate: response.shipDate,

          status: response.status,

          shippingAddress: response.shippingAddress

        });

        this.onStyleChange(response.styleId);

        setTimeout(() => {

          response.items.forEach(item => {

            if (item.type
              .toLowerCase()
              .includes('short')) {

              const row =
                this.shortSleeveRows.find(
                  x => x.size == item.size
                );

              if (row) {

                row.quantity = item.quantity;

                row.unitPrice = item.unitPrice;

              }

            }

            if (item.type
              .toLowerCase()
              .includes('full')) {

              const row =
                this.fullSleeveRows.find(
                  x => x.size == item.size
                );

              if (row) {

                row.quantity = item.quantity;

                row.unitPrice = item.unitPrice;

              }

            }

          });

        });

        this.loading = false;

        this.cdr.detectChanges();

      },

      error: err => {

        console.error(err);

        this.loading = false;

      }

    });

}

// form create
private buildRequest(): any {

  const form = this.orderForm.value;

  const items: any[] = [];

  this.shortSleeveRows.forEach(row => {

    if (row.quantity && row.unitPrice) {

      items.push({

        type: 'Short Sleeve Shirt',

        size: row.size,

        color: '',

        quantity: row.quantity,

        unitPrice: row.unitPrice

      });

    }

  });

  this.fullSleeveRows.forEach(row => {

    if (row.quantity && row.unitPrice) {

      items.push({

        type: 'Full Sleeve Shirt',

        size: row.size,

        color: '',

        quantity: row.quantity,

        unitPrice: row.unitPrice

      });

    }

  });

  return {

    orderId: form.orderId,

    poNumber: form.poNumber,

    buyerId: form.buyerId,

    styleId: form.styleId,

    orderDate: form.orderDate,

    shipDate: form.shipDate,

    status: form.status,

    shippingAddress: form.shippingAddress,

    items

  };

}


  // ==========================================
  // Save
  // ==========================================

  saveOrder(): void {

  if (this.orderForm.invalid) {

    this.orderForm.markAllAsTouched();

    return;

  }

  const request =
    this.buildRequest();

  if (this.isEdit) {

    this.orderService
      .update(this.orderId, request)
      .subscribe(() => {

        alert('Order Updated Successfully');

        this.router.navigate(['/orders']);

      });

  }

  else {

    this.orderService
      .create(request)
      .subscribe(() => {

        alert('Order Saved Successfully');

        this.router.navigate(['/orders']);

      });

  }

}

  // ==========================================
  // Reset
  // ==========================================

  resetForm(): void {

  this.orderForm.reset({

    status: 'PENDING'

  });

  this.showShortSleeve = false;

  this.showFullSleeve = false;

  this.shortSleeveRows = [];

  this.fullSleeveRows = [];

}


// toytal quantity method

getTotalQuantity(): number {

  let total = 0;

  this.shortSleeveRows.forEach(row => {

    total += Number(row.quantity) || 0;

  });

  this.fullSleeveRows.forEach(row => {

    total += Number(row.quantity) || 0;

  });

  return total;

}


// Calculate Subtotal method
getSubtotal(): number {

  let subtotal = 0;

  this.shortSleeveRows.forEach(row => {

    subtotal +=
      (Number(row.quantity) || 0)
      *
      (Number(row.unitPrice) || 0);

  });

  this.fullSleeveRows.forEach(row => {

    subtotal +=
      (Number(row.quantity) || 0)
      *
      (Number(row.unitPrice) || 0);

  });

  return subtotal;

}

// Calculate VAT Amount method
getVatAmount(): number {

  const vatPercent =
    Number(this.orderForm.get('vatPercent')?.value) || 0;

  return (this.getSubtotal() * vatPercent) / 100;

}


// Calculate Grand Total method
getGrandTotal(): number {

  return this.getSubtotal() + this.getVatAmount();

}



}
