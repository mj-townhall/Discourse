import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios, { AxiosRequestConfig } from 'axios';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {

  constructor(private toastr:ToastrService, private router:Router) {
    axios.defaults.baseURL = 'http://localhost:5050';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
  }

  request(method: string, url: string, data: any, isAuthenticated?: boolean): Promise<any> {
    let headers: any = {
      'Content-Type': 'application/json' // Default header
    };

    if (isAuthenticated) {
      headers.Authorization = `Bearer ${window.localStorage.getItem("auth_token")}`;
    }

    const config: AxiosRequestConfig = {
      method: method,
      url: url,
      data: data,
      headers: headers
    };

    return axios(config)
      .then(response => {
        return response // Return data from successful response
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          // Handle 401 Unauthorized error
          this.toastr.error("Session expired")
          setTimeout(()=>{this.router.navigate(["/login"])},2000)
        }
        return Promise.reject(error); // Propagate the error further
      });
  
  }
}
