import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Ingredients } from '../../shared/ingredients.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput',{static:false}) name: ElementRef;
  @ViewChild('amountInput',{static:false}) amount: ElementRef;
  @Output() newIngredientAdded=new EventEmitter<Ingredients>();
  addedIngredient: Ingredients;
  constructor() { }

  ngOnInit(): void {
  }

  addNewItem(){
     this.addedIngredient = {
       name:this.name.nativeElement.value,
       amount:this.amount.nativeElement.value
     };
    this.newIngredientAdded.emit(this.addedIngredient);
  }

}
