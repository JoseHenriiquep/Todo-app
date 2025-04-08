import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthResponse } from "../types/auth-response.type";
import { tap } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class AuthService{
    constructor(private httpClient: HttpClient){ }

    login(name: String, password: String){
        return this.httpClient.post<AuthResponse>("/", { name, password }).pipe(
            tap((value) => {
                localStorage.setItem("auth-token", value.token)
                localStorage.setItem("username", value.name)
            })
        )
    }
}