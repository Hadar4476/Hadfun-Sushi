import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dish-ingredients',
  templateUrl: './dish-ingredients.component.html',
  styleUrls: ['./dish-ingredients.component.css'],
})
export class DishIngredientsComponent implements OnInit {
  @Input() ingredients: string[];

  ingredients_dir = '../../../../../assets/images/ingredients/';

  constructor() {}

  ngOnInit(): void {}

  onIngredientskBoxClick = ({ target }) => {
    let innie_ingredients_box = document.getElementById(
      'innie_ingredients_box'
    );
    innie_ingredients_box.className =
      'innie_ingredients_box center border-black border-radius animate__animated animate__fadeOut animate__fast';
    setTimeout(() => {
      innie_ingredients_box.className = 'd-none';
      target.className = 'd-none';
    }, 500);
  };

  handleIngredientName = (ingredient: string) => {
    let rename = ingredient.replace('-', ' ');
    rename = rename.charAt(0).toUpperCase() + rename.slice(1);
    return rename;
  };
}
