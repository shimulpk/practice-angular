
import { Routes } from '@angular/router';

import { DayWiseFinishingProductionList } from '../pages/day-wise-finishing-production-list/day-wise-finishing-production-list';
import { DayWiseFinishingProductionForm } from '../pages/day-wise-finishing-production-form/day-wise-finishing-production-form';
import { DayWiseFinishingProductionDetails } from '../pages/day-wise-finishing-production-details/day-wise-finishing-production-details';

export const DAY_WISE_FINISHING_PRODUCTION_ROUTES: Routes = [

  {
    path: '',
    component: DayWiseFinishingProductionList
  },

  {
    path: 'add',
    component: DayWiseFinishingProductionForm
  },

  {
    path: 'edit/:id',
    component: DayWiseFinishingProductionForm
  },

  {
    path: ':id',
    component: DayWiseFinishingProductionDetails
  }

];

