import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThaiMarketComponent } from './thai-market.component';
import { ProductInfoComponent } from '../product/product-info/product-info.component';

const routes: Routes = [ 
  { path: '', component: ThaiMarketComponent },
  { path:':id', component: ProductInfoComponent} ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThaiMarketRoutingModule { }
