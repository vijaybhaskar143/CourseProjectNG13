import { Ingredients } from '../shared/ingredients.model';
import { Subject } from 'rxjs'

export class ShoppingListService {

   newIngredientAdded = new Subject<Ingredients[]>();
   startEditing = new Subject<number>();
   private ingredients:Ingredients[]=[
        new Ingredients('Apples',5),
        new Ingredients('Oranges',10)
      ];
  
    getIngredients(){
        return this.ingredients.slice();
    }

    addIngredientsToShoppingList(ingredientsin:Ingredients[]){
        this.ingredients.push(...ingredientsin);
        this.newIngredientAdded.next(this.ingredients.slice());
    }

    addNewIngredient(ingredient: Ingredients){
        this.ingredients.push(ingredient);
        this.newIngredientAdded.next(this.ingredients.slice());
    }

    getIngredient(index:number){
        return this.ingredients[index];
    }

    updateIngredient(index:number, ingredient: Ingredients){
        this.ingredients[index] = ingredient;
        this.newIngredientAdded.next(this.ingredients.slice());
    }

    deleteIngredient(index:number){
        this.ingredients.splice(index,1);
        this.newIngredientAdded.next(this.ingredients.slice());
    }
}