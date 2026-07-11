import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductionLineRequest } from '../../models/production-line-request';
import { ProductionLineService } from '../../services/production-line.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-production-line-form',
 standalone: true,
  imports: [ CommonModule,FormsModule],
  templateUrl: './production-line-form.html',
  styleUrl: './production-line-form.css',
})
export class ProductionLineForm implements OnInit{

    id?: number;

  isEdit = false;

  loading = false;

  productionLine: ProductionLineRequest = {

    lineId: '',

    capacityPerDay: 0,

    supervisor: ''

  };

  constructor(

    private productionLineService: ProductionLineService,

    private router: Router,

    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef

  ) { }


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      this.isEdit = true;

      this.id = +id;

      this.loadProductionLine();

    }

  }

   loadProductionLine(): void {

    if (!this.id) return;

    this.loading = true;

    this.productionLineService
      .getById(this.id)
      .subscribe({

        next: (response) => {

          this.productionLine = {

            lineId: response.lineId,

            capacityPerDay: response.capacityPerDay,

            supervisor: response.supervisor

          };

          this.loading = false;
          this.cdr.markForCheck();

        },

        error: (error) => {

          console.error(error);

          this.loading = false;

        }

      });

  }

  save(): void {

    if (this.isEdit) {

      this.update();

    } else {

      this.create();

    }
  }


    create(): void {

    this.loading = true;

    this.productionLineService
      .create(this.productionLine)
      .subscribe({

        next: () => {

          this.loading = false;

          this.router.navigate(['/production-lines']);

        },

        error: (error) => {

          console.error(error);

          this.loading = false;

        }

      });

  }

  update(): void {

    if (!this.id) return;

    this.loading = true;

    this.productionLineService
      .update(this.id, this.productionLine)
      .subscribe({

        next: () => {

          this.loading = false;

          this.router.navigate(['/production-lines']);

        },

        error: (error) => {

          console.error(error);

          this.loading = false;

        }

      });

  }


   cancel(): void {

    this.router.navigate(['/production-lines']);

  }



}
