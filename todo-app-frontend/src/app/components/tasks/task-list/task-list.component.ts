import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Task } from '../../../models/task.model';
import { TaskService } from '../../../services/task.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    CommonModule
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

  constructor(
    private router: Router,
    private taskService: TaskService,
    private toastService: ToastrService
  ){
    this.getTasks();
  }
  
  allTasks: Task[] = [];
  filteredTasks: Task[] = [];
  hasTasks: boolean = false;

  listStatus: string[] = ['pendente', 'em_andamento', 'concluida'];
  selectedStatus: string[] = [];

  getTasks(){
    this.taskService.getTasks().subscribe(tasks => {
      this.allTasks = tasks;
      this.hasTasks = tasks.length > 0;
      this.applyFilter();
    });
  }

  onStatusChange(event: any) {
    const status = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      this.selectedStatus.push(status);
    } else {
      this.selectedStatus = this.selectedStatus.filter(s => s !== status);
    }

    this.applyFilter();
  }

  applyFilter() {
    if (this.selectedStatus.length === 0) {
      this.filteredTasks = [...this.allTasks];
    } else {
      this.filteredTasks = this.allTasks.filter(task =>
        this.selectedStatus.includes(task.status)
      );
    }
  }

  deleteTask(_id: string) {
    this.taskService.deleteTask(_id).subscribe({
      next: () => {
        this.toastService.success("Tarefa deletada com sucesso!");
        setTimeout(() => {
          window.location.reload();
        }, 700)
      },
      error: () => this.toastService.error("Erro ao criar nova tarefa")
    });
  }

  navigate(_id: string){
    this.router.navigate(["/task-form", _id])
  }

  taskDetail(_id: string){
    this.router.navigate(['/task-detail', _id])
  }
}