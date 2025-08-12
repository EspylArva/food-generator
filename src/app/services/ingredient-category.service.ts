import { inject, Injectable } from "@angular/core";
import { Recipe } from "../model/recipe";
import { filter, map, Observable, of } from "rxjs";
import { Ingredient, IngredientCategory } from "../model/ingredient";
import { RecipeService } from "./recipe.service";
import { TreeNode } from "primeng/api";

@Injectable({
    providedIn: 'root'
})
export class IngredientCategoryService {

    private recipeService = inject(RecipeService);

    carbs : TreeNode[] = [];
    vegetables : TreeNode[] = [];
    proteins : TreeNode[] = [];
    optionals : TreeNode[] = [];

    private readonly ingredientToTreeNode = (ingredients: Ingredient[]) => {
        return ingredients.map(ingredient => { 
            return {
                label: ingredient.id,
                data: { type: ingredient.category, optional: ingredient.optional }
            };
        });
    };

    

    getCarbs(): Observable<TreeNode[]> {
        return this.recipeService.getCarbsIngredients().pipe(
            map<Ingredient[], TreeNode[]>(ingredients => this.ingredientToTreeNode(ingredients))
        );
    }

    getVegetables(): Observable<TreeNode[]> {
        return this.recipeService.getVegetablesIngredients().pipe(
            map<Ingredient[], TreeNode[]>(ingredients => this.ingredientToTreeNode(ingredients))
        );
    }

    getProteins(): Observable<TreeNode[]> {
        return this.recipeService.getProteinsIngredients().pipe(
            map<Ingredient[], TreeNode[]>(ingredients => this.ingredientToTreeNode(ingredients))
        );
    }

    getOptionals(): Observable<TreeNode[]> {
        return this.recipeService.getOptionalsIngredients().pipe(
            map<Ingredient[], TreeNode[]>(ingredients => this.ingredientToTreeNode(ingredients))
        );
    }
}