import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit, DoCheck {
  ngOnInit(): void {}

  ngDoCheck() {
    let userToken = localStorage.getItem('token');
    if (userToken) return this.userSignedIn();
    else {
      let sign_in_btn = document.getElementById('sign_in_btn');
      let order_note = document.getElementById('order_note');
      sign_in_btn.className =
        'bg-image-2 ml-2 cursor-pointer remove-effects-on-focus';
      order_note.className = 'text-white mt-4';
    }
  }

  userSignedIn() {
    let sign_in_btn = document.getElementById('sign_in_btn');
    let order_note = document.getElementById('order_note');
    sign_in_btn.className = 'd-none';
    order_note.className = 'd-none';
  }
}
