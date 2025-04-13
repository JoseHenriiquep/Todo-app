import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-task-detail',
  imports: [
    HeaderComponent,
    FooterComponent,
    CommonModule
  ],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent implements OnInit{

  taskId!: string;
  task: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService
  ){}
  
  ngOnInit(): void{
    this.taskId = this.activatedRoute.snapshot.paramMap.get('id')!;  
    this.taskService.getTaskById(this.taskId).subscribe(task => {
      this.task = task
    })
  }
}
