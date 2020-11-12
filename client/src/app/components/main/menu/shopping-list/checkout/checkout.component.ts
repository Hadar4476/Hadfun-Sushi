import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, DoCheck, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { UserService } from 'src/app/services/userService.service';
import { apiUrl } from '../../../../../../config.json';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit, DoCheck {
  order_details = [];
  total_price: number = 0;
  user = {
    name: '',
    address: '',
    phone: '',
  };

  complete_order_btnInnerHTML = 'Complete order';

  patterns = {
    phone: /^0[2-9]\d{7,8}$/,
  };

  constructor(
    private router: Router,
    private shoppingListService: ShoppingListService,
    private userService: UserService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.order_details = this.shoppingListService.order_details;
    this.total_price = this.shoppingListService.total_price;
    if (
      this.shoppingListService.order_details.length < 1 ||
      !this.shoppingListService.total_price ||
      !localStorage.getItem('token')
    )
      this.router.navigate(['/']);
  }

  ngDoCheck() {
    if (
      document.getElementById('checkout_darkbox')?.className !==
      'dark container-fluid center text-center animate__animated animate__fadeIn'
    )
      this.router.navigate(['/']);
  }

  onDarkBoxClick() {
    let order_complete_div = document.getElementById('order_complete_div');
    if (order_complete_div.className !== 'd-none') return;
    Swal.fire({
      title: 'Cancel payment?',
      icon: 'question',
      iconColor: 'red',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: 'red',
      cancelButtonText: 'No',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.isConfirmed) this.router.navigate(['/menu']);
    });
  }

  onSubmit(checkout_form, { target }) {
    if (
      this.validateName(
        checkout_form.submitted,
        checkout_form.form.controls.name
      ) &&
      this.validateAddress(
        checkout_form.submitted,
        checkout_form.form.controls.address
      ) &&
      this.validatePhoneNumber(
        checkout_form.submitted,
        checkout_form.form.controls.phone
      )
    ) {
      let complete_order_btn = document.getElementById(
        'complete_order_btn'
      ) as HTMLButtonElement;
      let loading_spinner = document.getElementById('loading_spinner');
      complete_order_btn.className =
        'btn float-right complete-order-btn-loading text-white';
      complete_order_btn.disabled = true;
      loading_spinner.className = 'spinner-border spinner-border-sm mb-1';
      this.complete_order_btnInnerHTML = 'Loading';
      this.user = {
        name: checkout_form.form.controls.name.value,
        address: checkout_form.form.controls.address.value,
        phone: checkout_form.form.controls.phone.value,
      };
      setTimeout(() => {
        target.className = 'd-none';
        let order_complete_div = document.getElementById('order_complete_div');
        order_complete_div.className = 'order-complete-container';
      }, 1500);
      const order_info = this.mapOrderInformation();
      let currentUser = this.userService.getCurrentUser();
      let userToken = localStorage.getItem('token');
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': userToken,
      });
      let options = { headers: headers };
      if (userToken && currentUser) {
        return this.http
          .put(`${apiUrl}/users/add-order`, order_info, options)
          .subscribe(() => {});
      }
    } else return;
  }

  validateName(submitted, name_field) {
    if (!submitted) return true;
    if (submitted) {
      if (
        !name_field.valid ||
        (name_field.value && name_field.value.length < 3)
      )
        return false;
      else return true;
    }
  }

  validateAddress(submitted, address_field) {
    if (!submitted) return true;
    if (submitted) {
      if (!address_field.valid) return false;
      else return true;
    }
  }

  validatePhoneNumber(submitted, phone_number_field) {
    if (!submitted) return true;
    if (submitted) {
      if (
        !phone_number_field.valid ||
        !phone_number_field.value.match(this.patterns.phone)
      )
        return false;
      else return true;
    }
  }

  mapOrderInformation() {
    let dishes = [];
    this.order_details.map((order) => {
      dishes.push(order.dish_id);
    });
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let dateObj = new Date();
    let month = monthNames[dateObj.getMonth()];
    let day = String(dateObj.getDate()).padStart(2);
    let year = dateObj.getFullYear();
    let date = `${month + ' ' + day + ', ' + year}`;

    return {
      created_at: date,
      order_details: {
        dishes: dishes,
        total_price: this.total_price,
      },
      contact: {
        name: this.user.name,
        address: this.user.address,
        phone: this.user.phone,
      },
    };
  }
}
