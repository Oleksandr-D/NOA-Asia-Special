import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacanciesComponent } from './vacancies.component';
import { VacanciesRouterModule } from './vacancies-router.module';
import { SharedModule } from '../../shared/shared.module';
import { KuharWokComponent } from '../kuhar-wok/kuhar-wok.component';
import { BarmenComponent } from '../barmen/barmen.component';
import { KyharRamenComponent } from '../kyhar-ramen/kyhar-ramen.component';
import { SushystComponent } from '../sushyst/sushyst.component';

@NgModule({
  declarations: [
    VacanciesComponent, KuharWokComponent, SushystComponent,
    KyharRamenComponent, BarmenComponent
  ],
  imports: [
    CommonModule,
    VacanciesRouterModule,
    SharedModule
  ]
})
export class VacanciesModule { }
