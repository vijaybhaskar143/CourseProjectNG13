import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  
  constructor(private recipeService: RecipeService,
  private router: Router, private route: ActivatedRoute) { }
  recipes: Recipe[];

  ngOnInit(): void {
    this.recipeService.recipesChanged
    .subscribe((recipe: Recipe[]) => {
      this.recipes= recipe;
    })
    this.recipes=this.recipeService.getRecipes();
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }


}
