import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { UserService } from 'src/app/services/userService.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    if (this.userService.getCurrentUser()) this.router.navigate(['/menu']);
  }

  onSubmit(sign_in_form) {
    if (
      !sign_in_form.form.controls.email.value ||
      !sign_in_form.form.controls.password.value
    )
      return;
    else {
      const user = {
        email: sign_in_form.form.controls.email.value,
        password: sign_in_form.form.controls.password.value,
      };
      this.userService.login(user.email, user.password, sign_in_form);
    }
  }
}
