import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AvailableStock } from '../../models/available-stock';
import { MaterialIssueService } from '../../services/material-issue.service';
import { MaterialIssueRequest } from '../../models/material-issue-request';

@Component({
  selector: 'app-material-issue-form',
   standalone: true,
  imports: [CommonModule,ReactiveFormsModule, RouterModule],
  templateUrl: './material-issue-form.html',
  styleUrl: './material-issue-form.css',
})
export class MaterialIssueForm implements OnInit{

    form!: FormGroup;

  availableStocks: AvailableStock[] = [];

  loading = false;

  saving = false;

  constructor(
    private fb: FormBuilder,
    private materialIssueService: MaterialIssueService,
    private router: Router,
    private cdr:ChangeDetectorRef
  ) {}


  ngOnInit(): void {
     this.initializeForm();

    this.loadAvailableStocks();
  }

   // ==========================
  // Initialize Form
  // ==========================

  initializeForm(): void {

    this.form = this.fb.group({

      issueDate: ['', Validators.required],

      department: ['', Validators.required],

      requestedBy: ['', Validators.required],

      remarks: [''],

      items: this.fb.array([])

    });

    this.addItem();

  }

  get items(): FormArray {

    return this.form.get('items') as FormArray;

  }

    // ==========================
  // Add Item
  // ==========================

  addItem(): void {

    this.items.push(

      this.fb.group({

        itemId: ['', Validators.required],

        quantity: [1, [Validators.required, Validators.min(1)]]

      })

    );

  }

  // ==========================
  // Remove Item
  // ==========================

  removeItem(index: number): void {

      if (this.items.length === 1) {

    return;

  }

    this.items.removeAt(index);

  }

  // ==========================
  // Load Available Stocks
  // ==========================

  loadAvailableStocks(): void {

    this.loading = true;

    this.materialIssueService
      .getAvailableStocks()
      .subscribe({

        next: (response) => {

          this.availableStocks = response;

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
  // Save
  // ==========================

  save(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;

    }

    this.saving = true;

    const request: MaterialIssueRequest = this.form.value;

    this.materialIssueService
      .create(request)
      .subscribe({

        next: () => {

          this.saving = false;

          alert('Material Issue created successfully.');

          this.router.navigate(['/material-issue']);

        },

        error: (error) => {

          console.error(error);

          this.saving = false;

          alert(error.error?.message || 'Failed to create Material Issue.');

        }

      });

  }


   // ==========================
  // Get Available Quantity
  // ==========================

  getAvailableQuantity(itemId: number): number {

    const stock = this.availableStocks.find(
      s => s.itemId === Number(itemId)
    );

    return stock ? stock.availableQuantity : 0;

  }

  // ==========================
  // Get Unit
  // ==========================

  getUnit(itemId: number): string {

    const stock = this.availableStocks.find(
      s => s.itemId === Number(itemId)
    );

    return stock ? stock.unit : '';

  }

  // ==========================
  // Track By
  // ==========================

  trackByIndex(index: number): number {

    return index;

  }

  // ==========================
  // Cancel
  // ==========================

  cancel(): void {

    this.router.navigate(['/material-issue']);

  }





}
