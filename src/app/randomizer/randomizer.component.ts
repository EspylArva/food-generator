import { Component, inject, OnInit } from '@angular/core';

import { TreeModule } from 'primeng/tree';
import { TreeNode } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { ToggleSwitchModule } from 'primeng/toggleswitch';


import { IngredientCategoryService } from '../services/ingredient-category.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from "primeng/table";
import { GeneratedRecipe } from '../model/recipe';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelect } from 'primeng/multiselect';
import { RecipeService } from '../services/recipe.service';
import { Ingredient } from '../model/ingredient';



@Component({
  selector: 'app-randomizer',
  imports: [
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
  ingredients: any[]|undefined;
  
  ngOnInit(): void {
    this.nodeService.getCarbs().subscribe(carbs => this.carbs = [{ label: 'Carbs', children: carbs, expanded: true }]);
    this.nodeService.getVegetables().subscribe(vegetables => this.vegetables = [{ label: 'Vegetables', children: vegetables, expanded: true }]);
    this.nodeService.getProteins().subscribe(proteins => this.proteins = [{ label: 'Proteins', children: proteins, expanded: true }]);
    this.nodeService.getOptionals().subscribe(optionals => this.optionals = [{ label: 'Optionals', children: optionals, expanded: true }]);

    this.recipeService.getIngredients().subscribe(ingredients => {this.ingredients = ingredients;});
  }

  generateRecipe(arg: any) {
    console.log('Generating recipe with restrictive filters:', this.isFilterRestrictive);
    console.log("Carbs: ", this.selectedCarbs);
    console.log("Vegetables: ", this.selectedVegetables);
    console.log("Proteins: ", this.selectedProteins);
    console.log("Optionals: ", this.selectedOptionals);

    const ingredients : Ingredient[] = [];

    this.generatedRecipes = [...this.generatedRecipes, {
      id: this.generateRecipeName(ingredients),
      ingredients: ingredients,
      keep: false,
      done: false,
    }];

  }

  private generateRecipeName(ingredients: Ingredient[]) : string {
    return "Recipe " + Math.floor(Math.random() * 100);
  }
  

}
