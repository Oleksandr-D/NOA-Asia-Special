import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VacanciesComponent } from './vacancies.component';
import { KuharWokComponent } from '../kuhar-wok/kuhar-wok.component';
import { SushystComponent } from '../sushyst/sushyst.component';
import { KyharRamenComponent } from '../kyhar-ramen/kyhar-ramen.component';
import { BarmenComponent } from '../barmen/barmen.component';

const routes: Routes = [
  { path: '', component: VacanciesComponent},
  { path: 'kyhar-wok', component: KuharWokComponent },
  { path: 'sychyst', component: SushystComponent},
  { path: 'kyhar-ramen', component: KyharRamenComponent },
  { path: 'barmen', component: BarmenComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VacanciesRouterModule { }
