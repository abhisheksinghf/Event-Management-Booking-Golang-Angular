import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user = {
    email: '',
    password: '',
    role: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post('http://localhost:8080/register', this.user).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.router.navigate(['/login']);  // Redirect to login page
      },
      error: (error) => {
        console.error('Registration failed', error);
      }
    });
  }
}
