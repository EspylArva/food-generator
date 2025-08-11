import { Ingredient } from "./ingredient";

export interface Recipe {
    id: string;
    ingredients: Ingredient[];
    time?: number;
    difficulty?: number;
    tags?: string[];
}

export interface GeneratedRecipe extends Recipe {
    done: boolean;
    keep: boolean;
}