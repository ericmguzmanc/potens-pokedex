import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent implements OnInit {

  activeRoute: string;

  constructor(private route: Router) {
    this.activeRoute = this.route.url;
  }

  setActive(route){
    this.activeRoute = route;
  }

  ngOnInit(){
    this.setActive(this.activeRoute);
  }

}