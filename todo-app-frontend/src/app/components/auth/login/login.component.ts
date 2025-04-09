import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [
    AuthService,
    ToastrService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output("submit") onSubmit = new EventEmitter();
  @Output("navigate") onNavigate = new EventEmitter();

  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastrService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  get email(){
    return this.loginForm.get('email')!;
  }
  get password(){
    return this.loginForm.get('password')!;
  }

  submitted = false;

  submit(){
    this.submitted = true;

    if (this.loginForm.invalid) return;

    this.onSubmit.emit();
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: (res) => {
        this.toastService.success("Login realizado!");
        localStorage.setItem("token", res.token)
        console.log(res.token)
        this.router.navigate(["task-list"])
      },
      error: () => this.toastService.error("Login ou senha inválidos")
    })
  }
  navigate(){
    this.onNavigate.emit()
    this.router.navigate(["register"])
  }
}