import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  errorMessage: string = ''; // To show error messages

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  login() {
    if (this.form.invalid) {
      this.errorMessage = 'Please fill out the form correctly.';
      return;
    }

    const loginData = this.form.value;

    this.http.post('http://localhost:8080/login', loginData).subscribe({
      next: (response: any) => {
        console.log('Login successful:', response);

        // Navigate to a URL with user_id included
        const userId = response.user_id; // Assuming the backend returns a user_id
        if (response.role === 'organizer') {
          this.router.navigate([`/organizer/${userId}`]);
        } else if (response.role === 'admin') {
          this.router.navigate([`/admin/${userId}`]);
        } else {
          this.router.navigate([`/attendee/${userId}`]);
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Invalid email or password.';
      }
    });
  }
}
