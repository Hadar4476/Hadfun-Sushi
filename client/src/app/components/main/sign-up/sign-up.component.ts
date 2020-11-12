import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { apiUrl } from '../../../../config.json';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/userService.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (this.userService.getCurrentUser()) this.router.navigate(['/menu']);
  }

  onSubmit(sign_up_form) {
    if (
      !sign_up_form.form.controls.email.value ||
      !sign_up_form.form.controls.confirm_password.value ||
      !sign_up_form.form.controls.password.value
    )
      return;

    if (
      sign_up_form.form.controls.confirm_password.value !==
      sign_up_form.form.controls.password.value
    )
      return;
    else {
      const user = {
        email: sign_up_form.form.controls.email.value,
        password: sign_up_form.form.controls.password.value,
        orders: [],
      };
      this.http.post(`${apiUrl}/users`, user).subscribe(
        () => {
          sign_up_form.reset();
          this.router.navigate(['/sign-in']);
        },
        (httpError) => {
          let email_input = document.getElementById('email_input');
          let email_error = document.getElementById('email_error');
          if (httpError.error && httpError.status === 400) {
            if (httpError.error === 'Email is already in use.') {
              email_input.className = 'form-control form-input-error mt-3';
              email_error.className = 'show m-1';
              email_error.innerHTML = '* Email is already in use.';
            }
            if (
              httpError.error ===
                '"email" length must be at least 6 characters long' ||
              httpError.error === '"email" must be a valid email'
            ) {
              email_input.className = 'form-control form-input-error mt-3';
              email_error.className = 'show m-1';
              email_error.innerHTML = '* Please enter a valid email address';
            }
          } else {
            email_input.className = 'form-control form-input mt-3';
            email_error.className = 'hidden m-1';
            email_error.innerHTML = '* Please enter a valid email address';
          }
        }
      );
    }
  }
}
