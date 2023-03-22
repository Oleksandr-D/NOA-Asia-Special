import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { PersonalDataComponent } from './personal-data/personal-data.component';

const routes: Routes = [
  { path: '', component: UserProfileComponent,
    children: [
      { path: 'order-history', component: OrderHistoryComponent },
      { path: 'personal-data', component: PersonalDataComponent},
      { path: 'password-change', component: PasswordChangeComponent },
      { path: '', pathMatch: 'full', redirectTo: 'personal-data' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
