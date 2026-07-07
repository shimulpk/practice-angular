import { Routes } from "@angular/router";
import { FabricRecordList } from "../pages/fabric-record-list/fabric-record-list";
import { FabricCheckForm } from "../pages/fabric-check-form/fabric-check-form";
import { FabricRecordDetails } from "../pages/fabric-record-details/fabric-record-details";


export const Fabric_ROUTES: Routes = [

 {
  path: '',
  component: FabricRecordList
},
{
  path: 'add',
  component: FabricCheckForm
},
{
  path: ':id',
  component: FabricRecordDetails
}

];