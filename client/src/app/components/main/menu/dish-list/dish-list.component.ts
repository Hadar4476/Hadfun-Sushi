import { Component, OnInit } from '@angular/core';

import { apiUrl } from '../../../../../config.json';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css'],
})
export class DishListComponent implements OnInit {
  sushi_arr: [] = [];
  vegan_sushi_arr: [] = [];
  wok_arr: [] = [];
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get(`${apiUrl}/dish-types/get-dish-types`)
      .subscribe((data: any) => {
        if (data) {
          this.sushi_arr = data.sushi_arr;
          this.vegan_sushi_arr = data.vegan_sushi_arr;
          this.wok_arr = data.wok_arr;
        }
      });
  }
}
