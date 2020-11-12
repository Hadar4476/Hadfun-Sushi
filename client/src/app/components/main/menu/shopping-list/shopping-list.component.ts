import { Component, DoCheck, OnInit } from '@angular/core';

import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { UserService } from 'src/app/services/userService.service';

import $ from 'jquery';
import Swal from 'sweetalert2';

import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, DoCheck {
  dish_arr: any[] = [];
  prices: number[] = [];
  order_started: number[] = [];
  final_payment: number = 0;
  empty_shopping_list: boolean = false;

  constructor(
    private shoppingListService: ShoppingListService,
    private router: Router,
    private userService: UserService
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event.url !== '/menu' || this.empty_shopping_list)
          this.emptyOrder();
      }
    });
  }

  ngOnInit(): void {
    this.dish_arr = this.shoppingListService.dish_arr;
    this.order_started = this.shoppingListService.order_started;
    this.prices = this.order_started;
    let shopping_list_container = document.getElementById(
      'shopping_list_container'
    ) as HTMLDivElement;
    let order_details_container = document.getElementById(
      'order_details_container'
    ) as HTMLDivElement;
    $(window).scroll(() => {
      if ($(window).scrollTop() > 69) {
        shopping_list_container.style.top = '40px';
        order_details_container.style.height = '775px';
      } else {
        shopping_list_container.style.top = '50px';
        order_details_container.style.height = '765px';
      }
    });
  }

  ngDoCheck(): any {
    if (this.empty_shopping_list) {
      this.emptyOrder();
      this.empty_shopping_list = false;
    }
    this.order_started = this.shoppingListService.order_started;
    this.prices = this.order_started;
  }

  emptyOrder = () => {
    this.shoppingListService.dish_arr.splice(
      0,
      this.shoppingListService.dish_arr.length
    );
    this.final_payment = 0;
    this.shoppingListService.order_started = [];
  };

  onCloseShoppingListBtn = () => {
    let shopping_list_container = document.getElementById(
      'shopping_list_container'
    ) as HTMLDivElement;
    let order_details_h1 = document.getElementById(
      'order_details_h1'
    ) as HTMLHeadingElement;
    Swal.fire({
      title: 'Cancel order?',
      icon: 'question',
      iconColor: 'red',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: 'red',
      cancelButtonText: 'No',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.isConfirmed) {
        shopping_list_container.style.animationName =
          'shopping-list-container-motion-hide';
        order_details_h1.className =
          'm-4 ff-nn animate__animated animate__fadeOut animate__faster space-between';
        this.empty_shopping_list = true;
        for (let i = 0; i < this.dish_arr.length; i++) {
          this.dish_arr[i].dish_amount = 1;
          let id = this.dish_arr[i].dish_id;
          this.revertOrderBtn(id);
        }
        setTimeout(() => {
          shopping_list_container.className = 'd-none';
        }, 1000);
      } else return;
    });
  };

  onCancelOrderBtnClick = (dish_index: number, dish_id: number) => {
    let amount = this.dish_arr[dish_index].dish_details.dish_amount;
    let dish_price = this.dish_arr[dish_index].dish_details.dish_price;
    for (let i = 0; i < amount; i++)
      this.order_started.splice(this.order_started.indexOf(dish_price), 1);
    this.dish_arr[dish_index].dish_details.dish_amount = 1;
    this.dish_arr.splice(dish_index, 1);
    this.revertOrderBtn(dish_id);
    if (this.dish_arr.length === 0) {
      this.order_started = [];
      this.onCloseShoppingListBtn();
    }
  };

  revertOrderBtn = (dish_id: number) => {
    let check_btn = document.getElementById(
      `check_btn${dish_id}`
    ) as HTMLButtonElement;
    check_btn.className = 'd-none';
    let order_btn = document.getElementById(
      `order_btn${dish_id}`
    ) as HTMLButtonElement;
    order_btn.disabled = true;
    order_btn.className =
      'order-btn btn ff-nuku fs-2rem h-55px w-150px bg-whitish remove-box-shaodw-on-focus';
    setTimeout(() => {
      order_btn.disabled = false;
    }, 2000);
  };

  onDiscardBtnClick = (dish_index: number) => {
    if (this.dish_arr[dish_index].dish_details.dish_amount === 1) return;
    for (let i = 0; i < this.prices.length; i++) {
      if (
        this.prices[i] === this.dish_arr[dish_index].dish_details.dish_price
      ) {
        this.prices.splice(i, 1);
        break;
      }
    }
    --this.dish_arr[dish_index].dish_details.dish_amount;
  };

  onAddBtnClick = (dish_index: number) => {
    this.prices.push(this.dish_arr[dish_index].dish_details.dish_price);
    ++this.dish_arr[dish_index].dish_details.dish_amount;
  };

  onGoToCheckout = () => {
    this.prices.map((price) => {
      this.final_payment += price;
    });
    Swal.fire({
      title: `Complete order's payment for $${this.final_payment}?`,
      icon: 'question',
      iconColor: 'red',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: 'red',
      cancelButtonText: 'No',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.isConfirmed) {
        let currentUser = this.userService.getCurrentUser();
        if (currentUser) {
          this.shoppingListService.onCheckOut(
            this.dish_arr,
            this.final_payment
          );
        } else
          Swal.fire({
            title: `Oops, looks like you are not signed in, you must sign in to complete the order`,
            icon: 'info',
            iconColor: 'red',
            showCancelButton: true,
            confirmButtonText: 'Sign in',
            confirmButtonColor: 'red',
            cancelButtonText: 'Cancel',
            cancelButtonColor: 'black',
          }).then((result) => {
            if (result.isConfirmed) this.router.navigate(['sign-in']);
          });
      } else {
        this.final_payment = 0;
      }
    });
  };
}
