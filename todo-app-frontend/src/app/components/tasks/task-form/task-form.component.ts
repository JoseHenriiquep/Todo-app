import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private taskService : TaskService,
    private toastService: ToastrService
  ){
    this.taskForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      status: new FormControl('pendente', [Validators.required]),
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

  taskId: string | null = null;
  public isEdit = false;

  submitted = false;

  ngOnInit(): void{
    this.taskId = this.activatedRoute.snapshot.paramMap.get('id');
    this.isEdit = !!this.taskId;

    if (this.isEdit && this.taskId) {
      this.taskService.getTaskById(this.taskId).subscribe(task => {
        this.taskForm.patchValue(task)
      })
    } else {
      this.taskForm.get('status')?.disable();
    }
  }


  submit(){
    this.submitted = true;

    this.onSubmit.emit();

    if (this.taskForm.invalid) return;

    const formData = this.taskForm.getRawValue();
    formData.dueDate = new Date(formData.dueDate);


    if (this.isEdit && this.taskId) {
      this.taskService.updateTask(this.taskId, formData).subscribe({
        next: () => {
          this.toastService.success("Tarefa atualizada com sucesso!");
          this.router.navigate(["/task-list"]);
        },
        error: () => this.toastService.error("Erro ao atualizar tarefa")
      });
    } else {
      this.taskService.createTask(formData).subscribe({
        next: () => {
          this.toastService.success("Tarefa criada com sucesso!");
          this.router.navigate(["/task-list"]);
        },
        error: () => this.toastService.error("Erro ao criar nova tarefa")
      });
    }
  }
}