import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { TaskListComponent } from './components/tasks/task-list/task-list.component';
import { authGuard } from './guard/auth.guard';
import { HeaderComponent } from './components/shared/header/header.component';

export const routes: Routes = [
    {
        path: "",
        component: LoginComponent
    },
    {
        path: "register",
        component: RegisterComponent
    },
    {
        path: "task-list",
        component: TaskListComponent,
        canActivate: [authGuard]
    },
    {
        path: "header",
        component: HeaderComponent
    }
];