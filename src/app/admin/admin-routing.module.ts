import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminVacanciesComponent } from "./admin-vacancies/admin-vacancies.component";
import { AdminProductComponent } from "./admin-product/admin-product.component";
import { AdminCategoryComponent } from "./admin-category/admin-category.component";
import { AdminComponent } from "./admin.component";
import { AdminOrdersComponent } from "./admin-orders/admin-orders.component";

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: 'category', component: AdminCategoryComponent },
      { path: 'product', component: AdminProductComponent },
      { path: 'vacancies', component: AdminVacanciesComponent },
      { path: 'order', component: AdminOrdersComponent },
      { path: '', pathMatch: 'full', redirectTo: 'discount' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
