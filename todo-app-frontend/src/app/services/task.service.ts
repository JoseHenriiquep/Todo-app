import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { Router } from '@angular/router';
import { Task } from "../models/task.model";

@Injectable({
    providedIn: "root"
})
export class TaskService{

    private url = "http://localhost:3000";

    constructor(
        private httpClient: HttpClient,
    ){}

    createTask(task: Task): Observable<Task>{
        return this.httpClient.post<Task>(`${this.url}/newTask`, task)
    }

    getTask(): Observable<Task[]>{
        return this.httpClient.get<Task[]>(`${this.url}/tasks`)
    }

    updateTask(id: string): Observable<Task>{
        return this.httpClient.get<Task>(`${this.url}/editTask/${id}`);
    }

    deleteTask(id: string): Observable<Task>{
        return this.httpClient.get<Task>(`${this.url}/deleteTask/${id}`);
    }
}