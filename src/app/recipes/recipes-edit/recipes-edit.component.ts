import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Params } from 'express-serve-static-core';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.scss']
})
export class RecipesEditComponent implements OnInit {
  id:number;
  editMode= false;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id= +params['id'];
          this.editMode= params['id'] != null;
        }
      )
  }

}
