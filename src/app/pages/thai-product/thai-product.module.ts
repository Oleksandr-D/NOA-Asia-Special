import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThaiProductRoutingModule } from './thai-product-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ThaiProductInfoComponent } from './thai-product-info/thai-product-info.component';
import { ThaiProductComponent } from './thai-product.component';

@NgModule({
  declarations: [ ThaiProductComponent, ThaiProductInfoComponent ],
  imports: [
    CommonModule,
    ThaiProductRoutingModule,
    SharedModule
  ]
})
export class ThaiProductModule { }
