import { Routes } from "@angular/router";
import { VendorList } from "../pages/vendor-list/vendor-list";
import { VendorForm } from "../pages/vendor-form/vendor-form";

export const VENDOR_ROUTES: Routes = [

  {
    path: '',
    component: VendorList
  },

  {
    path: 'add',
    component: VendorForm
  },

  {
    path: 'edit/:id',
    component: VendorForm
  }

];