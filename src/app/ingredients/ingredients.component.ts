import { Component, inject, input, linkedSignal, OnDestroy, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { TableModule } from 'primeng/table';
import { Ingredient } from '../model/ingredient';

@Component({
  selector: 'app-ingredients',
  imports: [
    TableModule
  ],
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.scss'
})
export class IngredientsComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = [];
  private recipeService = inject(RecipeService);

  ngOnInit(): void {

    this.recipeService.getIngredients().subscribe(ingredients => {
      ingredients.forEach(ingredient => {
        console.log(ingredient);
      });

      this.ingredients = ingredients;
    });
  }

  ngOnDestroy(): void {
  }

}
