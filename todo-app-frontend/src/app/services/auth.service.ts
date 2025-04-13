import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { tap } from "rxjs";
import { Router } from '@angular/router';

@Injectable({
    providedIn: "root"
})
export class AuthService{

    private url = "http://localhost:3000";

    constructor(
        private httpClient: HttpClient,
        private router: Router
    ){ }

    login(email: string, password: string){
        return this.httpClient.post<User>(`${this.url}/login`, { email, password }).pipe(
            tap((value) => {
                localStorage.setItem("token", value.token!);
                console.log(value.token);
            })
        )
    }

    logout(){
        alert("Você saiu da sua conta");
        localStorage.removeItem('token');
        this.router.navigate(["/"]);
    }

    register(name: string, email: string, password: string, confirmPassword: string){
        return this.httpClient.post(`${this.url}/register`, { name, email, password, confirmPassword }).pipe()
    }
}