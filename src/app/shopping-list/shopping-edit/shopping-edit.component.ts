import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Ingredients } from '../../shared/ingredients.model';
import { NgForm } from '@angular/forms'
import { ShoppingListService } from '../shopping-list.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') myForm : NgForm;
  editMode=false;
  editedIndex: number;
  editedItem: Ingredients;
  subscription: Subscription;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startEditing
    .subscribe((index: number)=>{
      this.editMode = true;
      this.editedIndex = index;
      this.editedItem = this.shoppingListService.getIngredient(index);
      this.myForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    })
  }

  onSubmit(myform: NgForm){
    const addedIngredient = {
      name: myform.value.name,
      amount: myform.value.amount
    };
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedIndex,addedIngredient);
    }
    else{
      this.shoppingListService.addNewIngredient(addedIngredient);
    }
    this.editMode=false;
    myform.reset();
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editedIndex);
    this.myForm.reset();
    this.editMode=false;
  }

  onClear(){
    this.myForm.reset();
    this.editMode=false;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
