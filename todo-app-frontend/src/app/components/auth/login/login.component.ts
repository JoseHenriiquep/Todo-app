import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
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

  submit(){
    this.onSubmit.emit();
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: () => this.toastService.success("Login feito com sucesso"),
      error: () => this.toastService.error("Algo inesperado aconteceu")
    })
  }
  navigate(){
    this.onNavigate.emit()
    this.router.navigate(["register"])
  }
}
