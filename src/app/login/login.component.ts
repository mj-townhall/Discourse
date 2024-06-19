import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup; // Declare loginForm as FormGroup
  showHidePassword: string = "password";
  hidePassword: boolean = true;

  constructor(private fb: FormBuilder) {
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
      return;
    }

    // If all validations pass, proceed with login logic
    console.log('Form submitted with:', this.loginForm.value);
    // Example: Call an API to authenticate the user or perform other actions
  }

  // Toggle password visibility (show/hide password)
  togglePasswordVisibility() {
    this.showHidePassword = this.showHidePassword === "text" ? "password" : "text";
    this.hidePassword = !this.hidePassword;
  }
}
