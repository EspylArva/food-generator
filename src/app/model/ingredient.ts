export interface Ingredient {
    id: string;
    category: IngredientCategory;
    optional?: boolean;
}

export enum IngredientCategory {
    meat = "meat",
    vegetable = "vegetable",
    fruit = "fruit",
    dairy = "dairy",
    grain = "grain",
    other = "other"
}