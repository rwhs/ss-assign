import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'pm-all-requests',
  templateUrl: './all-requests.component.html',
  styleUrls: ['./all-requests.component.scss']
})

export class AllRequestsComponent implements OnInit {

  constructor (
    private http: HttpClient,
    private router: Router
  ) {
    //
  }

  isLoggedIn = false;

  items = [];

  // Makes a request to API to close a maintenance request
  onClose(id: string): void {
    const header = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    });
    this.http.put('http://localhost:3333/api/maintenance-requests/' + id + '/close', null, { headers: header}).subscribe(
      (response: any) => {
        // Remove from view
        this.items = this.items.filter(item => !item.id.includes(id))
      },
      (error) => {
        console.log(error)
      }
    )
  }

  // Logout functionality; remove JWT and redirect
  onLogout(): void {
    localStorage.removeItem('access_token');
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    const header = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    });
    // Fetch all maintenance requests
    this.http.get('http://localhost:3333/api/maintenance-requests', { headers: header }).subscribe(
      (response: any) => {
        this.isLoggedIn = true;
        this.items = response;
      },
      (error) => {
        console.log(error);
        // Redirect to login if unauthorized
        if (error.status == 401) {
          this.router.navigate(['/admin'])
        }
      }
    )
  }
}