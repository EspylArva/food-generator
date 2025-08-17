import { Component, inject, OnInit } from '@angular/core';

import { TreeModule } from 'primeng/tree';
import { TreeNode } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ChipModule } from 'primeng/chip';


import { IngredientCategoryService } from '../services/ingredient-category.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from "primeng/table";
import { GeneratedRecipe } from '../model/recipe';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelect } from 'primeng/multiselect';
import { RecipeService } from '../services/recipe.service';
import { Ingredient } from '../model/ingredient';
import { IconUtils } from '../utils/icons';
import { FloatingCardComponent } from '../../ui/floating-card/floating-card.component';
import { IngredientChipComponent } from '../../ui/ingredient-card/ingredient-chip.component';



@Component({
  selector: 'app-randomizer',
  imports: [
    IngredientChipComponent, FloatingCardComponent,
    TreeModule, ToolbarModule,
    ToggleSwitchModule,
    CommonModule, FormsModule, CheckboxModule, MultiSelect,
    TableModule
],
  templateUrl: './randomizer.component.html',
  styleUrl: './randomizer.component.scss'
})
export class RandomizerComponent implements OnInit {
  
  private nodeService = inject(IngredientCategoryService);
  private recipeService = inject(RecipeService);


  // Sets whether filters should be an restricive (AND) or inclusive (OR)
  // Example: Selected vegetables include "Carrot" and "Broccoli": generate a recipe:
  // [Restrictive] : with both "Carrot" and "Broccoli"
  // [Inclusive] : with either "Carrot" or "Broccoli" or both
  isFilterRestrictive: boolean = true;

  // Filter data
  carbs : TreeNode[] = [];
  vegetables : TreeNode[] = [];
  proteins : TreeNode[] = [];
  optionals : TreeNode[] = [];

  // Filter selections
  selectedCarbs: any;
  selectedVegetables: any;
  selectedProteins: any;
  selectedOptionals: any;

  generatedRecipes: GeneratedRecipe[] = [];
  ingredients: Ingredient[] = [];

  // Floating card
  showCard = false;
  selectedIngredient: any;
  cardPosition = { x: 0, y: 0 };
  
  ngOnInit(): void {
    this.nodeService.getCarbs().subscribe(carbs => this.carbs = [{ label: 'Carbs', children: carbs, expanded: true }]);
    this.nodeService.getVegetables().subscribe(vegetables => this.vegetables = [{ label: 'Vegetables', children: vegetables, expanded: true }]);
    this.nodeService.getProteins().subscribe(proteins => this.proteins = [{ label: 'Proteins', children: proteins, expanded: true }]);
    this.nodeService.getOptionals().subscribe(optionals => this.optionals = [{ label: 'Optionals', children: optionals, expanded: true }]);

    this.recipeService.getIngredients().subscribe(ingredients => {this.ingredients = ingredients;});
  }

  generateRecipe(arg: any) {
    const ingredients = this.generateRecipeIngredients();

    // Assign a value to trigger change detection (don't push)
    this.generatedRecipes = [...this.generatedRecipes, {
      id: this.generateRecipeName(ingredients),
      ingredients: ingredients,
      keep: false, done: false,
    }];
  }

  private generateRecipeName(ingredients: Ingredient[]) : string {
    return "Recipe " + Math.floor(Math.random() * 100);
  }

  private generateRecipeIngredients() : Ingredient[] {
    const recipeIngredients: Ingredient[] = [];

    this.recipeService.getCarbsIngredients().subscribe(ingredients => {
      recipeIngredients.push(...this.getIngredient(ingredients, this.selectedCarbs));
    });

    this.recipeService.getVegetablesIngredients().subscribe(ingredients => {
      recipeIngredients.push(...this.getIngredient(ingredients, this.selectedVegetables));
    });

    this.recipeService.getProteinsIngredients().subscribe(ingredients => {
      recipeIngredients.push(...this.getIngredient(ingredients, this.selectedProteins));
    });

    this.recipeService.getOptionalsIngredients().subscribe(ingredients => {
      recipeIngredients.push(...this.getIngredient(ingredients, this.selectedOptionals));
    });

    return recipeIngredients;
  }

  private getRandom(ceil: number): number {
    return Math.floor(Math.random() * ceil);
  }

  private getIngredient(ingredients: Ingredient[], filteredIngredients: TreeNode[]) : Ingredient[] {
    if (this.isFilterRestrictive && filteredIngredients) {         // If filter is restrictive, add all selected ingredients
      return ingredients.filter(ingredient => filteredIngredients.some(i => i.label === ingredient.id));
    } else if (!this.isFilterRestrictive && filteredIngredients){  // If filter is inclusive, add a random ingredient among selection
      const label = filteredIngredients[this.getRandom(filteredIngredients.length)].label;
      return [ingredients.find(ingredient => ingredient.id === label)!];
    } else  {                                                      // If nothing selected, add a random ingredient from all available
      return [ingredients[this.getRandom(ingredients.length)]];
    }
  }

  // Floating card
  showFloatingCard(event: MouseEvent, ingredient: any) {
    this.selectedIngredient = ingredient;
    this.cardPosition = { x: event.clientX, y: event.clientY };
    this.showCard = true;
  }
  
  hideFloatingCard(event: MouseEvent, ingredient: any) {
    this.showCard = false;
  }

}
