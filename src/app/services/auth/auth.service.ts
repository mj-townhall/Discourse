import { Injectable } from '@angular/core';
import { SignupData } from '../../Model/SignupData';
import { AxiosService } from '../../axios.service';
import { LoginData } from '../../Model/LoginData';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(this.getInitialLoginStatus());

  constructor(private axiosService: AxiosService) {}

  private getInitialLoginStatus(): boolean {
    // Retrieve the login status from localStorage
    const authToken = localStorage.getItem('auth_token');
    const loggedIn = !!authToken; // !! converts truthy/falsy values to true/false

    return loggedIn;
  }
  async signup(data: SignupData) {
    try {
      const response = await this.axiosService.request('POST', '/register', {
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        email: data.email
      });
      console.log(response.data); // Access data from the response
    } catch (error) {
      console.error('Error signing up:', error);
      throw error; // Propagate the error for handling in the component
    }
  }

  async login(data: LoginData) {
    try {
      const response = await this.axiosService.request('POST', '/login', {
        email: data.email,
        password: data.password
      });
      console.log(response.data);
      this.setAuthToken(response.data.token);
      this.setUserId(response.data.id);
      this.loggedInSubject.next(true); // Update login status to true
      console.log(this.getAuthToken());
    } catch (error) {
      console.error('Error logging in:', error);
      throw error; // Propagate the error for handling in the component
    }
  }

  getAuthToken(): string | null {
    return localStorage.getItem("auth_token");
  }

  setAuthToken(token: string | null): void {
    if (token !== null) {
      localStorage.setItem("auth_token", token);
    } else {
      localStorage.removeItem("auth_token");
    }
  }

  getUserId(): number | null {
    const userId = localStorage.getItem("user_id");
    return userId !== null ? parseInt(userId, 10) : null;
  }
  
  setUserId(userId: number | null): void {
    if (userId !== null) {
      localStorage.setItem("user_id", userId.toString());
    } else {
      localStorage.removeItem("user_id");
    }
  }

  logOut(){
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_id");
    this.loggedInSubject.next(false); // Update login status to false on logout
  }

  isLoggedIn() {
    return this.loggedInSubject.value; // Access current login status
  }

  getLoginStatusObservable() {
    return this.loggedInSubject.asObservable(); // Observable to subscribe for login status changes
  }
}
