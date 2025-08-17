import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menubar } from 'primeng/menubar';
import { FilterService, MenuItem } from 'primeng/api';
import { ThemeSwitcherComponent } from '../ui/theme-switcher/theme-switcher.component';
import { Toolbar } from "primeng/toolbar";


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Menubar,
    ThemeSwitcherComponent,
    Toolbar
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  items: MenuItem[] | undefined;


  private filterService = inject(FilterService)

  
  ngOnInit() {
    // Initialize the menu items    
    this.items = this.getMenubarItems();

    // Register common filter for list of items
    this.filterService.register('listInList', (value: string[], filter: string[]) => { 
      if (!filter || filter.length === 0) { return true; }
      if (!value || value.length === 0) { return false; }

      for (let f of filter) {
        if (value.some(v => JSON.stringify(v) === JSON.stringify(f))) { return true };
      }
      return false;

    });
  }
  getMenubarItems() : MenuItem[] {
    return [
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
    ];
  }

  hide(event: any) {
    console.log(event);
  }
  
}
