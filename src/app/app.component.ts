import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menubar } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';
import { HomeComponent } from "./home/home.component";


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Menubar,
    ThemeSwitcherComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  items: MenuItem[] | undefined;
  
  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'fa fa-home',
        routerLink: '/home'
      },
      {
        label: 'Randomizer',
        icon: 'fa fa-random',
        routerLink: '/randomizer'
      },
      {
        label: 'List of Recipes',
        icon: 'fa fa-list-ul',
        items: [
          {
            label: 'Compendium of Recipes',
            icon: 'fa fa-utensils',
            routerLink: '/recipes'
          },
          {
            label: 'Compendium of Ingredients',
            icon: 'fa fa-boxes-stacked',
            routerLink: '/ingredients'
          }
        ]
      },
      {
        label: 'Contact & Information',
        icon: 'fa fa-question-circle',
        routerLink: '/information'
      }
    ]
  }

  hide(event: any) {
    console.log(event);
  }
  
}
