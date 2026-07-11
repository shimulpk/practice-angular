import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MachineResponse } from '../../models/machine-response';
import { MachineService } from '../../services/machine.service';

@Component({
  selector: 'app-machine-list',
   standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './machine-list.html',
  styleUrl: './machine-list.css',
})
export class MachineList implements OnInit{

   machines: MachineResponse[] = [];

  filteredMachines: MachineResponse[] = [];

  searchText = '';

  loading = false;

  constructor(
    private machineService: MachineService,
    private router: Router,
    private cdr:ChangeDetectorRef
  ) { }


  ngOnInit(): void {
      this.loadMachines();
  }

    loadMachines(): void {

    this.loading = true;

    this.machineService
      .getAll()
      .subscribe({

        next: (response) => {

          this.machines = response;

          this.filteredMachines = response;

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

  search(): void {

    const keyword = this.searchText
      .trim()
      .toLowerCase();

    if (!keyword) {

      this.filteredMachines = this.machines;

      return;

    }

    this.filteredMachines = this.machines.filter(machine =>

      machine.machineId.toLowerCase().includes(keyword) ||

      machine.machineName.toLowerCase().includes(keyword) ||

      machine.type.toLowerCase().includes(keyword) ||

      machine.lineId.toLowerCase().includes(keyword)

    );

  }

  edit(id: number): void {

    this.router.navigate(
      ['/machines/edit', id]
    );

  }

  delete(id: number): void {

    if (!confirm('Are you sure you want to delete this machine?')) {

      return;

    }

    this.machineService
      .delete(id)
      .subscribe({

        next: () => {

          this.loadMachines();

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

}
