import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductInfoComponent } from './pages/product/product-info/product-info.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { PersonalDataComponent } from './pages/user-profile/personal-data/personal-data.component';
import { PasswordChangeComponent } from './pages/user-profile/password-change/password-change.component';
import { OrderHistoryComponent } from './pages/user-profile/order-history/order-history.component';
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductComponent,
    ProductInfoComponent,
    UserProfileComponent,
    PersonalDataComponent,
    PasswordChangeComponent,
    OrderHistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
