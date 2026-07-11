import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductionLineResponse } from '../../../production-line/models/production-line-response';
import { MachineRequest } from '../../models/machine-request';
import { MachineService } from '../../services/machine.service';
import { ProductionLineService } from '../../../production-line/services/production-line.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-machine-form',
   standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './machine-form.html',
  styleUrl: './machine-form.css',
})
export class MachineForm implements OnInit{

   id?: number;

  isEdit = false;

  loading = false;

  productionLines: ProductionLineResponse[] = [];

  machine: MachineRequest = {

    machineId: '',

    machineName: '',

    type: '',

    productionLineId: 0

  };

  constructor(

    private machineService: MachineService,

    private productionLineService: ProductionLineService,

    private router: Router,

    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef

  ) { }


  ngOnInit(): void {
    this.loadProductionLines();

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      this.isEdit = true;

      this.id = +id;

      this.loadMachine();

    }
  }

   loadProductionLines(): void {

    this.productionLineService
      .getAll()
      .subscribe({

        next: (response) => {

          this.productionLines = response;

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

  loadMachine(): void {

    if (!this.id) return;

    this.loading = true;

    this.machineService
      .getById(this.id)
      .subscribe({

        next: (response) => {

          this.machine = {

            machineId: response.machineId,

            machineName: response.machineName,

            type: response.type,

            productionLineId: response.productionLineId

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

    this.machineService
      .create(this.machine)
      .subscribe({

        next: () => {

          this.loading = false;

          this.router.navigate(['/machines']);

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

    this.machineService
      .update(this.id, this.machine)
      .subscribe({

        next: () => {

          this.loading = false;

          this.router.navigate(['/machines']);

        },

        error: (error) => {

          console.error(error);

          this.loading = false;

        }

      });

  }

  cancel(): void {

    this.router.navigate(['/machines']);

  }


}
