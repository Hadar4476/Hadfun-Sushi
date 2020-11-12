// Modules:
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Components

import { AppComponent } from './app.component';
import { HomePageComponent } from './components/main/home-page/home-page.component';
import { HeaderComponent } from '../app/components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/main/menu/menu.component';
import { DishListComponent } from './components/main/menu/dish-list/dish-list.component';
import { DishIngredientsComponent } from './components/main/menu/dish-ingredients/dish-ingredients.component';
import { DishComponent } from './components/main/menu/dish-list/dish/dish.component';
import { ShoppingListComponent } from './components/main/menu/shopping-list/shopping-list.component';
import { SignInComponent } from './components/main/sign-in/sign-in.component';
import { SignUpComponent } from './components/main/sign-up/sign-up.component';
import { Page404Component } from './components/main/page-404/page-404.component';

// Directives

import { DishDirective } from './directives/dish-basic.directive';
import { DishEventsDirective } from './directives/dish-events.directive';

// Services

import { DishService } from './services/dish.service';
import { ShoppingListService } from './services/shopping-list.service';
import { UserService } from './services/userService.service';
import { StorageService } from './services/storageService.service';

// Routes

import { AppRoutingModule } from './routes/app-routing.model';
import { CheckoutComponent } from './components/main/menu/shopping-list/checkout/checkout.component';
import { OrderHistoryComponent } from './components/header/order-history/order-history.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    DishListComponent,
    DishComponent,
    DishIngredientsComponent,
    ShoppingListComponent,
    DishDirective,
    DishEventsDirective,
    HomePageComponent,
    Page404Component,
    SignInComponent,
    SignUpComponent,
    CheckoutComponent,
    OrderHistoryComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule],
  providers: [DishService, ShoppingListService, UserService, StorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
