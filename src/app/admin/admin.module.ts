import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminThaiMarketComponent } from './admin-thai-market/admin-thai-market.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminCategoryComponent,
    AdminProductComponent,
    AdminOrdersComponent,
    AdminThaiMarketComponent
  ],
  imports: [ CommonModule, AdminRoutingModule, SharedModule ]
})
export class AdminModule { }
