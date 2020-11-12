import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import jwtDecode from 'jwt-decode';
import { apiUrl } from '../../config.json';

const tokenKey = 'token';

@Injectable()
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

  getCurrentUser() {
    try {
      const jwt = localStorage.getItem(tokenKey);
      return jwtDecode(jwt);
    } catch (error) {
      return null;
    }
  }

  login(email, password, sign_in_form) {
    this.http
      .post(`${apiUrl}/auth`, {
        email,
        password,
      })
      .subscribe(
        (data: any) => {
          localStorage.setItem(tokenKey, data.token);
          sign_in_form.reset();
          this.router.navigate(['/menu']);
        },
        (httpError) => {
          let email_input = document.getElementById('email_input');
          let email_error = document.getElementById('email_error');
          if (
            httpError.error === '"email" must be a valid email' ||
            httpError.error ===
              '"email" length must be at least 6 characters long'
          ) {
            email_input.className = 'form-control form-input-error mt-3';
            email_error.className = 'show m-1';
            email_error.innerHTML = '* Please enter a valid email address';
          }
          if (
            httpError.error === 'Invaild email or password.' ||
            '"password" length must be at least 6 characters long'
          ) {
            email_input.className = 'form-control form-input-error mt-3';
            email_error.className = 'show m-1';
            email_error.innerHTML = '* Invalid email or password';
          }
        }
      );
  }

  logout() {
    return localStorage.removeItem(tokenKey);
  }
}
