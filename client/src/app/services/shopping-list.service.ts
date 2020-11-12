import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

@Injectable()
export class ShoppingListService {
  dish_arr: any[] = [];
  order_started: number[] = [];

  order_details = [];
  total_price: number = 0;

  constructor(private router: Router) {}

  onOrderBtnClick = (dish) => {
    this.order_started.push(dish.dish_details.dish_price);
    let shopping_list_container = document.getElementById(
      'shopping_list_container'
    );
    let order_details_h1 = document.getElementById('order_details_h1');
    order_details_h1.className =
      'm-4 ff-nn animate__animated animate__fadeIn animate__delay-1s space-between';
    shopping_list_container.style.animationName =
      'shopping-list-container-motion-display';
    shopping_list_container.style.animationFillMode = 'forwards';
    shopping_list_container.className =
      'container mt-4 shopping-list-container bg-white';
    this.dish_arr.push(dish);
  };

  onCheckOut = (order_details, total_price) => {
    this.order_details = [...order_details];
    this.total_price = total_price;
    this.router.navigate(['checkout']);
  };
}
