import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  @Input() element: Recipe;

  @Output() selectedRecipe= new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  onSelectedRecipe(){
    this.selectedRecipe.emit();
  }

}
