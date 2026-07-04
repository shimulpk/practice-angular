import { Routes } from "@angular/router";
import { BomList } from "../pages/bom-list/bom-list";
import { BomForm } from "../pages/bom-form/bom-form";
import { BomDetails } from "../pages/bom-details/bom-details";

export const BOM_ROUTES: Routes = [

 // ==================================
  // BOM Style List
  // ==================================

  {
    path: '',
    component: BomList
  },

  // ==================================
  // View BOM Items of Selected Style
  // ==================================

  {
    path: 'style/:styleId',
    component: BomDetails
  },

  // ==================================
  // Add BOM Item to Selected Style
  // ==================================

  {
    path: 'style/:styleId/add',
    component: BomForm
  },

  // ==================================
  // Edit BOM Item
  // ==================================

  {
    path: 'edit/:id',
    component: BomForm
  }
];