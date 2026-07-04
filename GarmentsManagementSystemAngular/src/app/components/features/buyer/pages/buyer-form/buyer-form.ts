import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BuyerService } from '../../services/buyer.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BuyerRequest } from '../../models/buyer-request';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buyer-form',
  imports: [CommonModule,ReactiveFormsModule],
   standalone: true,
  templateUrl: './buyer-form.html',
  styleUrl: './buyer-form.css',
})
export class BuyerForm implements OnInit{

   loading = false;

  isEdit = false;

  buyerId = 0;

  buyerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private buyerService: BuyerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.initializeForm();

    this.checkEditMode();

  }
 
    // Form Initialize
  
  initializeForm(): void {

    this.buyerForm = this.fb.group({

      buyerCode: ['', Validators.required],

      buyerName: ['', Validators.required],

      country: ['', Validators.required],

      address: [''],

      website: [''],

      currency: ['', Validators.required],

      paymentTerms: ['', Validators.required],

      contacts: this.fb.array([
        this.createContact()
      ])

    });

  }

   
    // Contact Form
   
  createContact(): FormGroup {

    return this.fb.group({

      contactName: ['', Validators.required],

      designation: [''],

      email: ['', Validators.email],

      phone: ['']

    });

  }

  
    // Contact Array
  
  get contacts(): FormArray {

    return this.buyerForm.get('contacts') as FormArray;

  }

  //  Add Contact
   
  addContact(): void {

    this.contacts.push(this.createContact());

  }

  // Remove Contact
  
  removeContact(index: number): void {

    if (this.contacts.length > 1) {

      this.contacts.removeAt(index);

    }

  }

  // Check Edit Mode
   
  checkEditMode(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {

      return;

    }

    this.isEdit = true;

    this.buyerId = Number(id);

    this.loadBuyer(this.buyerId);

  }

  // Load Buyer
   
  loadBuyer(id: number): void {

    this.loading = true;

    this.buyerService.getById(id).subscribe({

      next: (buyer) => {

        this.loading = false;

        this.buyerForm.patchValue({

          buyerCode: buyer.buyerCode,

          buyerName: buyer.buyerName,

          country: buyer.country,

          address: buyer.address,

          website: buyer.website,

          currency: buyer.currency,

          paymentTerms: buyer.paymentTerms

        });

        this.contacts.clear();

        buyer.contacts.forEach(contact => {

          this.contacts.push(

            this.fb.group({

              contactName: [contact.contactName, Validators.required],

              designation: [contact.designation],

              email: [contact.email, Validators.email],

              phone: [contact.phone]

            })

          );

        });

      },

      error: error => {

        console.error(error);

        this.loading = false;

      }

    });

  }


  //  Save / Update
 
  saveBuyer(): void {

    if (this.buyerForm.invalid) {

      this.buyerForm.markAllAsTouched();

      return;

    }

    const request: BuyerRequest = this.buyerForm.value;

    if (this.isEdit) {

      this.updateBuyer(request);

    } else {

      this.createBuyer(request);

    }

  }

 
  //  Create Buyer
  
  createBuyer(request: BuyerRequest): void {

    this.buyerService.create(request).subscribe({

      next: () => {

        alert('Buyer Created Successfully');

        this.router.navigate(['/buyers']);

      },

      error: error => {

        console.error(error);

      }

    });

  }


    // Update Buyer
  
  updateBuyer(request: BuyerRequest): void {

    this.buyerService.update(this.buyerId, request).subscribe({

      next: () => {

        alert('Buyer Updated Successfully');

        this.router.navigate(['/buyers']);

      },

      error: error => {

        console.error(error);

      }

    });

  }

  
    // Reset
  
  resetForm(): void {

    this.buyerForm.reset();

    this.contacts.clear();

    this.contacts.push(this.createContact());

  }

}





  





