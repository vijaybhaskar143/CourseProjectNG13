import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Special Recipe', 'very tasty one'
    ,'https://st2.depositphotos.com/3889193/7086/i/950/depositphotos_70860103-stock-photo-healthy-eating-and-food-preparation.jpg'),
    new Recipe('Marvelous Biryani', 'Favourite One'
    ,'https://st.depositphotos.com/3147737/4962/i/450/depositphotos_49622201-stock-photo-hyderabadi-biryani-a-popular-chicken.jpg'),
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
