import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-404',
  templateUrl: './page-404.component.html',
  styleUrls: ['./page-404.component.css'],
})
export class Page404Component implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onGoBackClick = () => {
    this.router.navigate(['/']);
  };
}
