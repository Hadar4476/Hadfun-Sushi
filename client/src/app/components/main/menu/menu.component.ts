import { Component, OnInit } from '@angular/core';

import { DishService } from 'src/app/services/dish.service';

import $ from 'jquery';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  ingredients: Array<string> = [];

  sushi_rolls_button: HTMLButtonElement;
  vegan_sushi_rolls_button: HTMLButtonElement;
  from_the_wok_button: HTMLButtonElement;

  sushi_rolls_area: HTMLDivElement;
  vegan_sushi_rolls_area: HTMLDivElement;
  from_the_wok_area: HTMLDivElement;

  constructor(private dishService: DishService) {}

  ngOnInit(): void {
    let sushi_rolls_button = document.getElementById(
      'sushi-rolls-button'
    ) as HTMLButtonElement;
    this.sushi_rolls_button = sushi_rolls_button;

    let vegan_sushi_rolls_button = document.getElementById(
      'vegan-sushi-rolls-button'
    ) as HTMLButtonElement;
    this.vegan_sushi_rolls_button = vegan_sushi_rolls_button;

    let from_the_wok_button = document.getElementById(
      'from-the-wok-button'
    ) as HTMLButtonElement;
    this.from_the_wok_button = from_the_wok_button;

    let sushi_rolls_area = document.getElementById(
      'sushi_rolls_area'
    ) as HTMLDivElement;
    this.sushi_rolls_area = sushi_rolls_area;

    let vegan_sushi_rolls_area = document.getElementById(
      'vegan_sushi_rolls_area'
    ) as HTMLDivElement;
    this.vegan_sushi_rolls_area = vegan_sushi_rolls_area;

    let from_the_wok_area = document.getElementById(
      'from_the_wok_area'
    ) as HTMLDivElement;
    this.from_the_wok_area = from_the_wok_area;

    this.dishService.getIngredients.subscribe(
      (ingredients: Array<string>) => (this.ingredients = ingredients)
    );

    let dish_nav_menu = document.getElementById(
      'dish-nav-menu'
    ) as HTMLDivElement;

    this.sushi_rolls_button.disabled = true;
    this.vegan_sushi_rolls_button.disabled = false;
    this.from_the_wok_button.disabled = false;

    $(window).scrollTop(0);

    $(window).scroll(() => {
      if ($(window).scrollTop() > 69) {
        dish_nav_menu.style.top = '0';
        dish_nav_menu.className =
          'dish-types-menu col d-flex justify-content-center w-100';
      } else {
        dish_nav_menu.style.top = '70px';
        dish_nav_menu.className =
          'dish-types-menu col-8 d-flex justify-content-between';
      }
      if (
        $(window).scrollTop() >
        this.sushi_rolls_area.offsetTop -
          250 +
          this.sushi_rolls_area.offsetHeight
      ) {
        this.sushi_rolls_button.disabled = true;
        this.vegan_sushi_rolls_button.disabled = false;
        this.from_the_wok_button.disabled = false;
      }
      if (
        $(window).scrollTop() >
        this.vegan_sushi_rolls_area.offsetTop -
          250 +
          this.vegan_sushi_rolls_area.offsetHeight
      ) {
        this.vegan_sushi_rolls_button.disabled = true;
        this.sushi_rolls_button.disabled = false;
        this.from_the_wok_button.disabled = false;
      }
      if (
        $(window).scrollTop() >
        this.from_the_wok_area.offsetTop -
          250 +
          this.from_the_wok_area.offsetHeight
      ) {
        this.from_the_wok_button.disabled = true;
        this.vegan_sushi_rolls_button.disabled = false;
        this.sushi_rolls_button.disabled = false;
      }
    });
  }

  onSushiRollsClick = ({ target }) => {
    target.disabled = true;
    this.vegan_sushi_rolls_button.disabled = false;
    this.from_the_wok_button.disabled = false;

    this.sushi_rolls_area.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };
  onVeganSushiRollsClick = ({ target }) => {
    target.disabled = true;
    this.sushi_rolls_button.disabled = false;
    this.from_the_wok_button.disabled = false;

    this.vegan_sushi_rolls_area.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };
  onFromTheWokClick = ({ target }) => {
    target.disabled = true;
    this.sushi_rolls_button.disabled = false;
    this.vegan_sushi_rolls_button.disabled = false;

    this.from_the_wok_area.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };
}
