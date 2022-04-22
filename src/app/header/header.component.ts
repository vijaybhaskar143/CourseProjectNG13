import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
    selector:'app-header',
    templateUrl:'header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
    constructor(private dataStorageService: DataStorageService,
        private authService: AuthService){

    }
    private authSub: Subscription;
    isAuthenticated=false;
    collapsed=true;

    @Output() featureSelected = new EventEmitter<string>();

    ngOnInit(){
        this.authSub = this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user;
        });
    }

    ngOnDestroy(){
        this.authSub.unsubscribe();
    }
    onSaveRecipe(){
        this.dataStorageService.storeRecipes();
    }
    onFetchRecipes(){
        this.dataStorageService.fetchRecipes().subscribe();
    }
}