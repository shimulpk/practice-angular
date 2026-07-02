import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BuyerService } from '../../services/buyer.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BuyerRequest } from '../../models/buyer-request';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buyer-form',
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
   standalone: true,
  templateUrl: './buyer-form.html',
  styleUrl: './buyer-form.css',
})
export class BuyerForm implements OnInit{

   private fb = inject(FormBuilder);
  private buyerService = inject(BuyerService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

   buyerId?: number;

  buyerForm!: FormGroup;

  ngOnInit(): void {
   this.buyerForm = this.fb.group({
buyerCode: ['', Validators.required],

      buyerName: ['', Validators.required],

      country: ['', Validators.required],

      address: [''],

      website: [''],

      currency: [''],

      paymentTerms: [''],

      contacts: this.fb.array([])

   });

   this.addContact();
   this.buyerId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.buyerId) {

      this.loadBuyer(this.buyerId);

    }

  }

  get contacts(): FormArray {

    return this.buyerForm.get('contacts') as FormArray;

  }


   addContact(): void {

    this.contacts.push(

      this.fb.group({

        contactName: [''],

        designation: [''],

        email: [''],

        phone: ['']

      })

    );

  }

    removeContact(index: number): void {

    this.contacts.removeAt(index);

  }

   loadBuyer(id: number): void {

    this.buyerService.getById(id).subscribe({

      next: (buyer) => {

        this.contacts.clear();

        buyer.contacts.forEach(contact => {

          this.contacts.push(

            this.fb.group({

              contactName: [contact.contactName],

              designation: [contact.designation],

              email: [contact.email],

              phone: [contact.phone]

            })

          );

        });

        this.buyerForm.patchValue({

          buyerCode: buyer.buyerCode,

          buyerName: buyer.buyerName,

          country: buyer.country,

          address: buyer.address,

          website: buyer.website,

          currency: buyer.currency,

          paymentTerms: buyer.paymentTerms

        });

      }

    });

  }

  save(): void {

    if (this.buyerForm.invalid) {

      this.buyerForm.markAllAsTouched();

      return;

    }

    const request: BuyerRequest = this.buyerForm.value;

    if (this.buyerId) {

      this.buyerService.update(this.buyerId, request).subscribe({

        next: () => this.router.navigate(['/buyers'])

      });

    } else {

      this.buyerService.create(request).subscribe({

        next: () => this.router.navigate(['/buyers'])

      });

    }

}





  




}
