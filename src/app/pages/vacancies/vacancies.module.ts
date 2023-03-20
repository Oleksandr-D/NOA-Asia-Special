import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacanciesComponent } from './vacancies.component';
import { VacanciesRouterModule } from './vacancies-router.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [VacanciesComponent],
  imports: [
    CommonModule,
    VacanciesRouterModule,
    SharedModule
  ]
})
export class VacanciesModule { }
