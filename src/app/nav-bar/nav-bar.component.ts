import { 
  Component, 
  OnInit,
  Input
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent implements OnInit {

  @Input() title: String;

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