import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProductComponent } from "./admin-product/admin-product.component";
import { AdminCategoryComponent } from "./admin-category/admin-category.component";
import { AdminComponent } from "./admin.component";
import { AdminOrdersComponent } from "./admin-orders/admin-orders.component";
import { AdminThaiMarketComponent } from './admin-thai-market/admin-thai-market.component'
 
const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: 'category', component: AdminCategoryComponent },
      { path: 'product', component: AdminProductComponent },
      { path: 'order', component: AdminOrdersComponent },
      { path: 'thai-market', component: AdminThaiMarketComponent  },
      { path: '', pathMatch: 'full', redirectTo: 'category' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
