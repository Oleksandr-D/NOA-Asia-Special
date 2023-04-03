import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfertaComponent } from './oferta.component';
import { OfertaRoutingModule } from './oferta-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [OfertaComponent],
  imports: [
    CommonModule,
    OfertaRoutingModule,
    SharedModule
  ]
})
export class OfertaModule { }
