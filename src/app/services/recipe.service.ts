import { Injectable } from "@angular/core";
import { Recipe } from "../model/recipe";
import { map, Observable, of } from "rxjs";
import RECIPES from "../../resources/recipes.json"
import { Ingredient, IngredientCategory } from "../model/ingredient";

@Injectable({
    providedIn: 'root'
})
export class RecipeService {

    private readonly ingredientFilter: (cats: IngredientCategory[]) => ((ingredient: Ingredient) => boolean) = (categories: IngredientCategory[]) => {
        return (ingredient: Ingredient) => categories.map(category => ingredient.category === category).reduce((acc, current) => acc || current, false) 
    }

    getIngredients(): Observable<Ingredient[]> {
        let ingredients = RECIPES
            .map(recipe => recipe.ingredients)
            .flat()
            .sort((a, b) => a.id.localeCompare(b.id)) // Sort alphabetically
            .reduce((m, t) => m.set(t.id, t as Ingredient), new Map<string, Ingredient>()); // Remove duplicates

        // Validate ingredients
        Array.from(ingredients.values()).forEach(ingredient => {
            if (!(ingredient.category in IngredientCategory)) {
                console.error(`Invalid ingredient category: ${ingredient.category}`);
            }
        });

        return of(Array.from(ingredients.values()));
    }

    getRecipes(): Observable<Recipe[]> {
        const recipes: any = RECIPES;

        // Validate recipes
        recipes.forEach((recipe: Recipe) => {
            recipe.ingredients.forEach(ingredient => {
                if (!(ingredient.category in IngredientCategory)) {
                    console.error(`Invalid ingredient category: ${ingredient.category} in recipe ${recipe.id}`);
                }
            });
        });

        return of(recipes);
    }


    getCarbsIngredients(): Observable<Ingredient[]> {
        return this.getIngredients().pipe(
            map<Ingredient[], Ingredient[]>(ingredients => ingredients.filter(this.ingredientFilter([IngredientCategory.grain])))
        );
    }

    getVegetablesIngredients(): Observable<Ingredient[]> {
        return this.getIngredients().pipe(
            map<Ingredient[], Ingredient[]>(ingredients => ingredients.filter(this.ingredientFilter([IngredientCategory.vegetable, IngredientCategory.fruit])))
        );
    }

    getProteinsIngredients(): Observable<Ingredient[]> {
        return this.getIngredients().pipe(
            map<Ingredient[], Ingredient[]>(ingredients => ingredients.filter(this.ingredientFilter([IngredientCategory.meat])))
        );
    }

    getOptionalsIngredients(): Observable<Ingredient[]> {
        return this.getIngredients().pipe(
            map<Ingredient[], Ingredient[]>(ingredients => {
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
            })
        );
    }
}