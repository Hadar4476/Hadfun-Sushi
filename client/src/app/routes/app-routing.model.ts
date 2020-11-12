import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { OrderHistoryComponent } from '../components/header/order-history/order-history.component';

import { HomePageComponent } from '../components/main/home-page/home-page.component';
import { MenuComponent } from '../components/main/menu/menu.component';
import { CheckoutComponent } from '../components/main/menu/shopping-list/checkout/checkout.component';
import { Page404Component } from '../components/main/page-404/page-404.component';
import { SignInComponent } from '../components/main/sign-in/sign-in.component';
import { SignUpComponent } from '../components/main/sign-up/sign-up.component';

const appRoutes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'order-history', component: OrderHistoryComponent },
  { path: '**', component: Page404Component },
];

const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
};

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
