import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
@Input() myRecipe: Recipe;
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }
  addToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.myRecipe.ingredients); 
  }
}
