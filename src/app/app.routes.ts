import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RandomizerComponent } from './randomizer/randomizer.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ErrorComponent } from './error/error.component';
import { InfoComponent } from './info/info.component';
import { IngredientsComponent } from './ingredients/ingredients.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'randomizer', component: RandomizerComponent },
    { path: 'recipes', component: RecipesComponent },
    { path: 'ingredients', component: IngredientsComponent },
    { path: 'information', component: InfoComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },  // Redirect to placeholder by default
    { path: '**', component: ErrorComponent}
];
