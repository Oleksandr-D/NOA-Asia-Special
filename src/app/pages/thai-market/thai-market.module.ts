import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThaiMarketComponent } from './thai-market.component';
import { ThaiMarketRoutingModule } from './thai-market-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ThaiMarketComponent],
  imports: [
    CommonModule,
    ThaiMarketRoutingModule,
    SharedModule
  ]
})
export class ThaiMarketModule { }
