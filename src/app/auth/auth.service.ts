import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError,retry, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { User } from './user.model';

export interface ResponseAuthData{
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
    registered?:string
}

@Injectable({
    providedIn:'root'
})
export class AuthService{
    user = new Subject<User>();
    constructor(private http:HttpClient){}

    onLogin(email:string, password:string){
        return this.http.post<ResponseAuthData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAuMdyJJBa6vf6Ma7OzgEqgPtfy4RAVdAI',
        {
            email: email,
            password: password,
            returnSecureToken: true
        })
        .pipe(
            catchError(this.handleError),
        tap(respData => {
            this.handleAuthentication(respData.email,respData.localId,respData.idToken,+respData.expiresIn);
        })
        );
    }

    onSignUp(email:string, password: string){
        return this.http.post<ResponseAuthData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAuMdyJJBa6vf6Ma7OzgEqgPtfy4RAVdAI',
        {
            email: email,
            password: password,
            returnSecureToken: true
        })
        // .pipe(retry(1), catchError(this.handleError));
        .pipe(
            catchError(this.handleError),
        tap(respData => {
            this.handleAuthentication(respData.email,respData.localId,respData.idToken,+respData.expiresIn);
        })
        );
    }

    private handleAuthentication(email:string, userid: string, token:string, expiresIn: number){
        const expirationDate= new Date(new Date().getTime() + +expiresIn * 1000);
        const user= new User(email, userid, token, expirationDate);
        this.user.next(user);
    }

    handleError(errorResp:HttpErrorResponse) {
        let errorMessage="An Unknown Error Occured!";
        if(!errorResp.error || !errorResp.error.error){
            return throwError(errorMessage);
        }
        switch(errorResp.error.error.message){
            case 'EMAIL_EXISTS': 
                errorMessage="This Email Already Existed!";
                break;
            case 'EMAIL_NOT_FOUND': 
                errorMessage="This Email not existed!";
                break;
            case 'INVALID_PASSWORD': 
                errorMessage="This Password is invalid!";
                break;
        }
        return throwError(errorMessage);
    }
}