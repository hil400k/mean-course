import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLoading = false;

  constructor(
    private authService: AuthService
  ) {
  }

  onLogin(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;
      this.authService.loginUser(form.value.email, form.value.password);
    }
  }
}
