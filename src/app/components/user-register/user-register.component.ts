import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent {
  registerForm!: FormGroup;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onRegister(): void {
    if (this.registerForm.invalid) return;
    if (
      this.registerForm.value.email === 'vineeth@gmail.com' &&
      this.registerForm.value.password === '123456'
    ) {
      this.router.navigate(['/schedule']);
    }
  }
}
