import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryComponent } from './delivery.component';
import { DeliveryRoutingModule } from './delivery-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [DeliveryComponent],
  imports: [
    CommonModule,
    DeliveryRoutingModule,
    SharedModule
  ]
})
export class DeliveryModule { }
