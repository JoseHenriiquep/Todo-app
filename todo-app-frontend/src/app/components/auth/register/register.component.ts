import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    ToastrService
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @Output("submit") onSubmit = new EventEmitter();
  @Output("navigate") onNavigate = new EventEmitter();

  registerForm!: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastrService
  ) {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  submit(){
    this.onSubmit.emit();
    this.authService.login(this.registerForm.value.email, this.registerForm.value.password).subscribe({
      next: () => this.toastService.success("Cadastro feito com sucesso!"),
      error: () => this.toastService.error("Algo inesperado aconteceu! Tente novamente mais tarde.")
    })
  }
  navigate(){
    this.onNavigate.emit()
    this.router.navigate(["/"])
  }
}