import { Component, inject, input, linkedSignal, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../model/recipe';
import { Ingredient } from '../model/ingredient';

import { Button } from "primeng/button";
import { ChipModule } from 'primeng/chip';
import { IconFieldModule } from 'primeng/iconfield';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

import { CommonModule } from '@angular/common';

import { RecipeService } from '../services/recipe.service';
import { IconUtils } from '../utils/icons';
import { FloatingCardComponent } from "../floating-card/floating-card.component";

@Component({
  selector: 'app-recipes',
  imports: [
    Button, ChipModule, IconFieldModule,
    TableModule, TooltipModule,
    InputGroupAddonModule, InputIconModule, InputTextModule,
    TagModule, MultiSelectModule, SelectModule, CommonModule,
    CommonModule,
    FloatingCardComponent
],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss'
})
export class RecipesComponent implements OnInit, OnDestroy {

  expandedRows: { [s: string]: boolean; } = {};
  
  private recipeService = inject(RecipeService);
  
  recipes: Recipe[] = [];

  tags: any[] = [
    "quick",
    "easy",
    "slow-cooker",
    "hearty",
    "vegetarian",
    "vegan"
  ];
  
  ingredients: Ingredient[] = [];
  selectedRecipe: any;

  showCard = false;
  selectedIngredient: any;
  cardPosition = { x: 0, y: 0 };
  hideTimeout: any;

  ngOnInit(): void {

    this.recipeService.getRecipes().subscribe(recipes => {
      this.recipes = Object.values(recipes);
      console.info(`Recipes loaded (${this.recipes.length}): [${this.recipes.map(r => r.id).join(', ')}]`);
    });
    this.recipeService.getIngredients().subscribe(ingredients => {this.ingredients = ingredients;});
  }

  ngOnDestroy(): void {

  }

  /**
   * Handle autocomplete for global fiter
   * @param event Event containing the global filter value
   * @param table The table
   */
  handleInput(event: any | Event, table: Table<Recipe>) {
    if (event.target) {
      table.filterGlobal(event.target.value, 'contains');
    }
  }

  /**
   * Clear table's filters
   * @param table The table
   */
  clear(table: Table<Recipe>) {
    table.clear();
  }

  /**
   * Expand or collapse the selected recipe information
   * @param recipe The selected row
   */
  select(recipe: Recipe) {
    this.expandedRows = recipe ? { [recipe.id]: true} : {};
  }

  getIcon(category: string) : string {
    return IconUtils.getFAIngredientIcon(category);
  }

  showFloatingCard(event: MouseEvent, ingredient: any) {
    console.log("Show:", ingredient, event);
    this.selectedIngredient = ingredient;
    this.cardPosition = { x: event.clientX, y: event.clientY };
    this.showCard = true;
    console.log("Show:", this.cardPosition);
  }
  
  hideFloatingCard(event: MouseEvent, ingredient: any) {
    console.log("Hide:", ingredient, event);
    this.showCard = false;
    console.log("Show:", this.cardPosition);
  }
}

