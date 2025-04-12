import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(
    public router: Router,
    private authService: AuthService
  ){ }

  fazerLogout(){
    this.authService.logout();
  }

  navigateTaskForm(){
    this.router.navigate(["/task-form"])
  }
  navigateTaskList(){
    this.router.navigate(["/task-list"])
  }
}
