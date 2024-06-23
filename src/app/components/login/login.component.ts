import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginData } from '../../Model/LoginData';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup; // Declare loginForm as FormGroup
  showHidePassword: string = "password";
  hidePassword: boolean = true;

  constructor(private fb: FormBuilder, private authService :AuthService, private router: Router) {
    // Initialize the form in the constructor
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  // Submit handler for form submission
  onSubmit() {
    // Check if form is valid
    if (this.loginForm.invalid) {
      // Handle invalid form submission if needed
      alert("All fields are required and must be filled correctly.");
      return;
    }

    const loginData :LoginData= this.loginForm.value as LoginData;
    this.authService.login(loginData); 
    console.log('Form submitted with:', this.loginForm.value);
    this.router.navigate(['home']);
    // window.location.reload();
    // Example: Call an API to authenticate the user or perform other actions
  }

  // Toggle password visibility (show/hide password)
  togglePasswordVisibility() {
    this.showHidePassword = this.showHidePassword === "text" ? "password" : "text";
    this.hidePassword = !this.hidePassword;
  }
}
