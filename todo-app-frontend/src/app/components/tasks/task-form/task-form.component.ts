import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-task-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  @Output("submit") onSubmit = new EventEmitter();
  @Output("navigate") onNavigate = new EventEmitter();

  taskForm!: FormGroup;

  constructor(
    private router: Router,
    private taskService : TaskService,
    private toastService: ToastrService
  ){
    this.taskForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      status: new FormControl({ value: 'pendente', disabled: true }, [Validators.required]),
      priority: new FormControl('', [Validators.required]),
      dueDate: new FormControl('', [Validators.required])
    })
  }

  get title(){
    return this.taskForm.get('title')!;
  };
  get description(){
    return this.taskForm.get('description')!;
  };
  get status(){
    return this.taskForm.get('status')!;
  };
  get priority(){
    return this.taskForm.get('priority')!;
  };
  get dueDate(){
    return this.taskForm.get('dueDate')!;
  };

  submitted = false;

  submit(){
    this.submitted = true;

    this.onSubmit.emit();

    const formData = this.taskForm.getRawValue();
    formData.dueDate = new Date(formData.dueDate);

    this.taskService.createTask(formData).subscribe({
      next: () => {
        this.toastService.success("Tarefa criada com sucesso!");
        this.router.navigate(["/task-list"]);
      },
      error: () => this.toastService.error("Erro ao criar nova tarefa")
    })
  }
}
