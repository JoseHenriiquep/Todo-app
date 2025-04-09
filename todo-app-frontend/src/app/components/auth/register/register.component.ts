import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    CommonModule
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

  get name(){
    return this.registerForm.get('name')!;
  }
  get email(){
    return this.registerForm.get('email')!;
  }
  get password(){
    return this.registerForm.get('password')!;
  }
  get confirmPassword(){
    return this.registerForm.get('confirmPassword')!;
  }


  submitted = false;

  submit(){
    this.submitted = true;
    this.onSubmit.emit();
    this.authService.register(this.registerForm.value.name, this.registerForm.value.email, this.registerForm.value.password, this.registerForm.value.confirmPassword).subscribe({
      next: () => {
          this.toastService.success("Cadastro Realizado com sucesso!"),
          this.router.navigate(["/"])
      },
      error: () => this.toastService.error("Algo inesperado aconteceu! Tente novamente mais tarde.")
    })
  }
  navigate(){
    this.onNavigate.emit()
    this.router.navigate(["/"])
  }
}