import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThaiMarketComponent } from './thai-market.component';
import { ThaiMarketRoutingModule } from './thai-market-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ThaiProductInfoComponent } from './thai-product-info/thai-product-info.component';

@NgModule({
  declarations: [ThaiMarketComponent, ThaiProductInfoComponent],
  imports: [
    CommonModule,
    ThaiMarketRoutingModule,
    SharedModule
  ]
})
export class ThaiMarketModule { }
