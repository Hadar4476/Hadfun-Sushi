import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/userService.service';
import { apiUrl } from '../../../../config.json';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  orders = [];
  dishes_ordered = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    let currentUser = this.userService.getCurrentUser();
    let userToken = localStorage.getItem('token');
    if (!userToken || !currentUser) return this.router.navigate(['sign-in']);
    else {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': userToken,
      });
      let options = { headers: headers };
      if (userToken && currentUser) {
        return this.http
          .get(`${apiUrl}/users/order-history`, options)
          .subscribe((orders: any) => {
            this.orders = orders;
          });
      }
    }
  }

  setRowColsByOrdersLength(orders_length) {
    if (orders_length === 1) return 'row row-cols-1';
    else if (orders_length === 2)
      return 'row row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2';
    else if (orders_length >= 3)
      return 'row row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-3';
  }

  onShowDishesClick(order, index) {
    let darkbox = document.getElementById(`dishes_details_darkbox${index}`);
    let innie_darkbox = document.getElementById(
      `innie_dishes_details_darkbox${index}`
    );
    darkbox.className =
      'dishes-details-darkbox container-fluid center text-center animate__animated animate__fadeIn';
    innie_darkbox.className =
      'innie-dishes-details-darkbox center animate__animated animate__fadeIn';
    const { dishes } = order.order_details;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = { headers: headers };
    return this.http
      .get(`${apiUrl}/dish-types/get-single-dish/${dishes.join(', ')}`, options)
      .subscribe((data: any) => {
        this.dishes_ordered = [...data];
      });
  }

  onDarkBoxClick({ target }, index) {
    let innie_darkbox = document.getElementById(
      `innie_dishes_details_darkbox${index}`
    );
    target.className =
      'dishes-details-darkbox container-fluid center text-center animate__animated animate__fadeOut';
    innie_darkbox.className =
      'innie-dishes-details-darkbox center animate__animated animate__fadeOut animate__fast';
    setTimeout(() => {
      target.className = 'd-none';
      innie_darkbox.className = 'd-none';
    }, 1000);
  }
}
