import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  constructor() {}

  date = new Date();
  year = this.date.getFullYear();

  ngOnInit(): void {}

  onFooterLogoClick = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
}
