import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthService, ResponseAuthData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector:'app-auth',
    templateUrl: '../auth/auth.component.html'
})
export class AuthComponent  {
    
    constructor(private authService: AuthService, private router: Router){
    }
    isLoginMode=true;
    isLoading=false;
    error:string=null;
    
    onSwitchLoginMode(){
        this.isLoginMode = ! this.isLoginMode;
    }

    onSubmit(form: NgForm){

        const email = form.value.email;
        const password = form.value.password;
        let authObs: Observable<ResponseAuthData>;
        this.isLoading=true;
        if(this.isLoginMode){
            authObs = this.authService.onLogin(email,password)
        }else{
            authObs = this.authService.onSignUp(email,password)
        }

        authObs.subscribe(
            respData => {
                this.isLoading=false;
                this.error=null;
                console.log(respData);
                this.router.navigate(['/recipes']);
            }, 
            errorMessage => {
                this.isLoading=false;
                this.error = errorMessage
                console.log(errorMessage);
            }
        );
        
        form.reset();
    }
}