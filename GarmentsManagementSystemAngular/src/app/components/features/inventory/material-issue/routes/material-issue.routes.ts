import { Routes } from "@angular/router";
import { MaterialIssueList } from "../pages/material-issue-list/material-issue-list";
import { MaterialIssueForm } from "../pages/material-issue-form/material-issue-form";
import { MaterialIssueDetails } from "../pages/material-issue-details/material-issue-details";

export const MATERIAL_ISSUE_ROUTES: Routes = [

  {
    path: '',
    component: MaterialIssueList
  },

  {
    path: 'create',
    component: MaterialIssueForm
  },

  {
    path: ':id',
    component: MaterialIssueDetails
  }

];