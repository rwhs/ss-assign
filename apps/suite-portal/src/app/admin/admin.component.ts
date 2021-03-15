import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'pm-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {

  constructor (
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    //
  }

  isFailedLoginAttempt = false;

  adminForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  onSubmit() {
    if (this.adminForm.valid) {
      // Send credentials to API to validate
      this.http.post('http://localhost:3333/api/auth/login', this.adminForm.value).subscribe(
        (response) => {
          // Store our JWT to LocalStorage for authentication
          localStorage.setItem('access_token', response['access_token']);
          this.router.navigate(['/requests'], { state: { message: 'You are now logged in!' } })
        },
        (error) => {
          this.isFailedLoginAttempt = true;
          console.log("Invalid credentials!")
        }
      )
    }
  }

  ngOnInit(): void {
    //
  }

}