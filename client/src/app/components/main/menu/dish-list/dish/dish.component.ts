import { Component, OnInit, Input } from '@angular/core';

import { DishService } from 'src/app/services/dish.service';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css'],
})
export class DishComponent implements OnInit {
  @Input() dish;
  @Input() dish_index: number;

  darkbox_id: string;

  constructor(private dishService: DishService) {}

  ngOnInit(): void {}

  onDishImageClick = (dish_id: string) => {
    this.dishService.onDishImageClick(dish_id);
  };

  onDarkBoxClick = (dark_box) => {
    this.dishService.onDarkBoxClick(dark_box);
  };

  onDishIngredientsClicked = (ingredients: Array<string>) => {
    this.dishService.getIngredients.emit(ingredients);
    let ingredients_box = document.getElementById('ingredients_box');
    ingredients_box.className =
      'ingredients_box container-fluid center text-center';
    let innie_ingredients_box = document.getElementById(
      'innie_ingredients_box'
    );
    innie_ingredients_box.className =
      'innie_ingredients_box center border-black border-radius animate__animated animate__fadeIn';
  };

  onOrderBtnClick = (dish, { target }) => {
    target.className = 'd-none';
    let check_btn = document.getElementById(`check_btn${dish.dish_id}`);
    check_btn.style.backgroundImage =
      'url("../../../../../../assets/images/check-order-1.gif"';
    check_btn.className =
      'order-btn-bg-image btn ff-nuku fs-2rem h-55px w-200px bg-whitish remove-box-shaodw-on-focus';
    setTimeout(() => {
      check_btn.style.backgroundImage =
        'url("../../../../../../assets/images/after-check-order-1.jpg")';
    }, 1450);
    this.dishService.onOrderBtnClick(dish);
  };
}
