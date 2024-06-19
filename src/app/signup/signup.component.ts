import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup; // Declare signupForm as FormGroup
  showHidePassword: string = "password";
  hidePassword: boolean = true;

  constructor(private fb: FormBuilder) {
    // Initialize the form in the constructor
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator // Custom validator for password match
    });
  }

  ngOnInit() {
  }

  // Custom validator function for password match
  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');
  
    if (passwordControl && confirmPasswordControl) {
      const passwordValue = passwordControl.value;
      const confirmPasswordValue = confirmPasswordControl.value;
  
      // Check if passwords match
      if (passwordValue === confirmPasswordValue) {
        confirmPasswordControl.setErrors(null); // Clear the 'passwordMismatch' error if passwords match
        return null; // Return null if passwords match
      } else {
        confirmPasswordControl.setErrors({ passwordMismatch: true }); // Set 'passwordMismatch' error if passwords do not match
        return { passwordMismatch: true }; // Return an object indicating password mismatch
      }
    }
  
    return null; // Default return null if controls are undefined (though this may not occur if controls are properly defined)
  }

  // Submit handler for form submission
  onSubmit() {
    // Check if form is valid
    if (this.signupForm.invalid) {
      // Handle invalid form submission if needed
      console.log("All fields are required and must be filled correctly.");
      return;
    }

    // If all validations pass, proceed with signup logic
    console.log('Form submitted with:', this.signupForm.value);
    // Example: Call an API to register user
  }

  // Toggle password visibility (show/hide password)
  togglePasswordVisibility() {
    this.showHidePassword = this.showHidePassword === "text" ? "password" : "text";
    this.hidePassword = !this.hidePassword;
  }
}
