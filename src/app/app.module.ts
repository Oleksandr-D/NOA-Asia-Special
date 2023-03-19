import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductInfoComponent } from './pages/product/product-info/product-info.component';
import { ThaiMarketComponent } from './pages/thai-market/thai-market.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { AboutComponent } from './pages/about/about.component';
import { VacanciesComponent } from './pages/vacancies/vacancies.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { AuthorizationComponent } from './pages/authorization/authorization.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { PersonalDataComponent } from './pages/user-profile/personal-data/personal-data.component';
import { PasswordChangeComponent } from './pages/user-profile/password-change/password-change.component';
import { OrderHistoryComponent } from './pages/user-profile/order-history/order-history.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminVacanciesComponent } from './admin/admin-vacancies/admin-vacancies.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductComponent,
    ProductInfoComponent,
    ThaiMarketComponent,
    DeliveryComponent,
    FavoritesComponent,
    AboutComponent,
    VacanciesComponent,
    ContactComponent,
    CheckoutComponent,
    AuthorizationComponent,
    UserProfileComponent,
    PersonalDataComponent,
    PasswordChangeComponent,
    OrderHistoryComponent,
    AdminComponent,
    AdminCategoryComponent,
    AdminProductComponent,
    AdminVacanciesComponent,
    AdminOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
