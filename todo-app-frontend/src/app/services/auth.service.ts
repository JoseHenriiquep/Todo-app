import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthResponse } from "../types/auth-response.type";
import { tap } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class AuthService{

    private url = "http://localhost:3000";

    constructor(private httpClient: HttpClient){ }

    login(email: String, password: String){
        return this.httpClient.post<AuthResponse>(`${this.url}/login`, { email, password })
    }

    register(name: String, email: String, password: String, confirmPassword: String){
        return this.httpClient.post(`${this.url}/register`, { name, email, password, confirmPassword }).pipe()
    }
}