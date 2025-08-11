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

    private readonly ingredientToTreeNode = (ingredient: Ingredient): TreeNode => {
        return {
            label: ingredient.id,
            data: { type: ingredient.category, optional: ingredient.optional }
        }
    };

    private readonly ingredientFilter: (cats: IngredientCategory[]) => ((ingredient: Ingredient) => boolean) = (categories: IngredientCategory[]) => {
        return (ingredient: Ingredient) => categories.map(category => ingredient.category === category).reduce((acc, current) => acc || current, false) 
    }

    getCarbs(): Observable<TreeNode[]> {
        return this.recipeService.getIngredients().pipe(
            map<Ingredient[], TreeNode[]>(ingredients => {
                return ingredients.filter(this.ingredientFilter([IngredientCategory.grain]))
                    .map(this.ingredientToTreeNode);
            })
        );
    }

    getVegetables(): Observable<TreeNode[]> {
        return this.recipeService.getIngredients().pipe(
            map<Ingredient[], TreeNode[]>(ingredients => {
                return ingredients.filter(this.ingredientFilter([IngredientCategory.vegetable, IngredientCategory.fruit]))
                    .map(this.ingredientToTreeNode);
            })
        );
    }

    getProteins(): Observable<TreeNode[]> {
        return this.recipeService.getIngredients().pipe(
            map<Ingredient[], TreeNode[]>(ingredients => {
                return ingredients.filter(this.ingredientFilter([IngredientCategory.meat]))
                    .map(this.ingredientToTreeNode);
            })
        );
    }

    getOptionals(): Observable<TreeNode[]> {
        return this.recipeService.getIngredients().pipe(
            map<Ingredient[], TreeNode[]>(ingredients => {
                return ingredients.filter(ingredient => {
                    return ![
                        // Carbs
                        IngredientCategory.grain,
                        // Vegetables
                        IngredientCategory.vegetable, IngredientCategory.fruit, 
                        // Proteins
                        IngredientCategory.meat, 
                    ].includes(ingredient.category);
                })
                    .map(this.ingredientToTreeNode);
            })
        );
    }
}