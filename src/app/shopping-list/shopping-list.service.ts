import { Ingredients } from '../shared/ingredients.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {

   newIngredientAdded = new EventEmitter<Ingredients>();
   private ingredients:Ingredients[]=[
        new Ingredients('Apples',5),
        new Ingredients('Oranges',10)
      ];
  
    getIngredients(){
        return this.ingredients.slice();
    }

    addIngredientsToShoppingList(ingredients:Ingredients[]){
        this.ingredients.push(...ingredients);
    }
}