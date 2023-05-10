import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThaiMarketComponent } from './thai-market.component';

const routes: Routes = [
  { path: '', component: ThaiMarketComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThaiMarketRoutingModule { }
