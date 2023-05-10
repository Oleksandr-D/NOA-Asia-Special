import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThaiProductComponent } from './thai-product.component';
import {ThaiProductInfoComponent} from './thai-product-info/thai-product-info.component';

const routes: Routes = [
  { path: '', component: ThaiProductComponent },
  { path:':id', component: ThaiProductInfoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThaiProductRoutingModule { }
