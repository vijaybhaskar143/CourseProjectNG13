import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Params } from 'express-serve-static-core';
import { interval,Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators'
@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.scss']
})
export class RecipesEditComponent implements OnInit, OnDestroy {
  id:number;
  editMode= false;

  private firstSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id= +params['id'];
          this.editMode= params['id'] != null;
        }
      )


      // this.firstSubscription = interval(1000).subscribe(count => {
      //   console.log(count);
      //   count++;
      // })

      const customIntervalObservable= Observable.create(observer => {
        let count=0;
         setInterval(() => {
          observer.next(count);
           if(count===2){
             observer.complete();
           }
           if(count > 3){
            observer.error(new Error('Count is greater than 3!'))
           }
           count++;
         },1000)
      })

      this.firstSubscription = customIntervalObservable.pipe(filter((data:number) => {
        return data > 0;
      }),map((data:number) => {
        return 'Round '+ data;
      })).subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);
        alert(error.message);
      }, () => {
        console.log('Completed!');
      })
  }

  ngOnDestroy(){
    this.firstSubscription.unsubscribe();
  }

}
