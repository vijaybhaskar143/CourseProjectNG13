import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService{
   selectedRecipe = new EventEmitter<Recipe>();
   private recipes: Recipe[] = [
        new Recipe(
         'Beautiful Burger',
         'Very tasty one',
         'https://www.seriouseats.com/thmb/gsco3uhFd26vcJNlJfJQi8tDs0g=/1125x1125/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2014__09__20140918-jamie-olivers-comfort-food-insanity-burger-david-loftus-f7d9042bdc2a468fbbd50b10d467dafd.jpg',
          [
              new Ingredients('Onions',5),
              new Ingredients('Meat',3),
              new Ingredients('Buns',3)
          ]
        ),
        new Recipe('Marvelous Biryani',
         'Favourite One',
         'https://st.depositphotos.com/3147737/4962/i/450/depositphotos_49622201-stock-photo-hyderabadi-biryani-a-popular-chicken.jpg',
         [
             new Ingredients('Biryani Rice', 5),
             new Ingredients('Masala', 10),
             new Ingredients('Chicken', 2)
         ]
        ),
      ];

      constructor(private shoppingListService: ShoppingListService){}
    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(index:number){
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients:Ingredients[]){
        this.shoppingListService.addIngredientsToShoppingList(ingredients);
    }
}