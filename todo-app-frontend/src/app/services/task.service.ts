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
        return this.httpClient.post<Task>(`${this.url}/newTask`, task);
    }

    getTasks(): Observable<Task[]>{
        return this.httpClient.get<Task[]>(`${this.url}/tasks`);
    }

    getTaskById(_id:string): Observable<Task>{
        return this.httpClient.get<Task>(`${this.url}/task/${_id}`);
    }

    updateTask(_id: string, task: Task): Observable<Task>{
        return this.httpClient.put<Task>(`${this.url}/editTask/${_id}`, task);
    }

    deleteTask(_id:string){
        return this.httpClient.delete<void>(`${this.url}/deleteTask/${_id}`);
    }
}