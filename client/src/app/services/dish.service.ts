import { Injectable, EventEmitter } from '@angular/core';

import { ShoppingListService } from './shopping-list.service';

@Injectable()
export class DishService {
  dark_box_id: string;
  getIngredients = new EventEmitter<Array<string>>();

  constructor(private shoppingListService: ShoppingListService) {}

  onDishImageClick = (id: string) => {
    let darkbox = document.getElementById(id);
    let innie_dark_box = document.getElementById(`innie_dark_box${id}`);
    darkbox.className =
      'dark container-fluid center text-center animate__animated animate__fadeIn';
    innie_dark_box.className =
      'dark_box center animate__animated animate__fadeIn';
    return (this.dark_box_id = id);
  };

  onDarkBoxClick = ({ target }) => {
    let innie_dark_box = document.getElementById(
      `innie_dark_box${this.dark_box_id}`
    );
    target.className =
      'dark container-fluid center text-center animate__animated animate__fadeOut';
    innie_dark_box.className =
      'dark_box center animate__animated animate__fadeOut animate__fast';
    setTimeout(() => {
      target.className = 'd-none';
      innie_dark_box.className = 'd-none';
    }, 1000);
  };

  onOrderBtnClick = (dish) => this.shoppingListService.onOrderBtnClick(dish);
}
