import { Routes } from "@angular/router";
import { MachineList } from "../pages/machine-list/machine-list";
import { MachineForm } from "../pages/machine-form/machine-form";

export const MACHINE_ROUTES: Routes = [

  {
    path: '',
    component: MachineList
  },

  {
    path: 'add',
    component: MachineForm
  },

  {
    path: 'edit/:id',
    component: MachineForm
  }

];