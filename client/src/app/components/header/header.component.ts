import {
  Component,
  DoCheck,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrl } from '../../../config.json';
import { UserService } from 'src/app/services/userService.service';

import { Router } from '@angular/router';

import $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, DoCheck {
  @ViewChild('dropdown_menu', { static: true }) dropdown_menu: ElementRef;

  username: string = '';
  show: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    $(window).click(() => {
      this.show = false;
    });
  }

  ngDoCheck() {
    if (this.username) return;
    let userToken = localStorage.getItem('token');
    if (userToken) return this.getUser(userToken);
  }

  getUser(userToken) {
    let currentUser = this.userService.getCurrentUser();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': userToken,
    });
    let options = { headers: headers };
    if (userToken && currentUser) {
      this.http
        .get(`${apiUrl}/users/me`, options)
        .subscribe((user_data: any) => {
          let user_panel = document.getElementById('user_panel');
          user_panel.className = 'dropdown pt-2 mr-3';
          return (this.username = user_data.email
            .replace('@', ' ')
            .split(' ')[0]);
        });
    }
  }

  onLogOut() {
    let user_panel = document.getElementById('user_panel');
    user_panel.className = 'd-none';
    this.dropdown_menu.nativeElement.className = 'd-none';
    this.show = false;
    this.username = '';
    this.userService.logout();
    this.router.navigate(['']);
  }

  toggleDropdownMenu(event) {
    event.stopPropagation();
    this.show = !this.show;
  }
}
