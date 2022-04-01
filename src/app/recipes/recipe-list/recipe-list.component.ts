import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  
  constructor(private recipeService: RecipeService) { }
  recipes: Recipe[];

  ngOnInit(): void {
    this.recipes=this.recipeService.getRecipes();
  }


}
