import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';
import {Subscription} from 'rxjs'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  ingredients:Ingredients[];
  private subscription: Subscription;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients=this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.newIngredientAdded.subscribe(
      (ingredients: Ingredients[]) => {
       this.ingredients= ingredients;
      })
  }
  onEditIngredient(index:number){
    this.shoppingListService.startEditing.next(index);
  }

  ngOnDestroy():void{
    this.subscription.unsubscribe();
  }
}
