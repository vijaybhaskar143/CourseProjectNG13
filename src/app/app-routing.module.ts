import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipesEditComponent } from './recipes/recipes-edit/recipes-edit.component';
import { RecipesResolverService } from './recipes/recipes-resolver.service';
import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [
 { path:'', redirectTo: '/recipes', pathMatch:'full'},
 { path:'recipes', component: RecipesComponent, children:[
        {
            path:'', 
            component: RecipeStartComponent,
            resolve: [RecipesResolverService]
        },
        {path:'new', component:RecipesEditComponent},
        {
            path:':id', 
            component:RecipeDetailComponent,
            resolve: [RecipesResolverService]
        },
        {
            path:':id/edit', 
            component:RecipesEditComponent,
            resolve: [RecipesResolverService]
        }
    ] },
 { path:'shopping-list', component: ShoppingListComponent },
 { path: 'auth', component: AuthComponent}

];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}