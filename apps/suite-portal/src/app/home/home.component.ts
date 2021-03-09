import { Component, OnInit } from '@angular/core';
import { ALL_SERVICE_TYPES } from '@suiteportal/api-interfaces';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'pm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  serviceTypes = ALL_SERVICE_TYPES;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    //
  }

  maintenanceForm = this.fb.group({
    unitNumber: ['', Validators.required],
    name: ['', Validators.required],
    email: ['', Validators.email],
    serviceType: ['', Validators.required],
    summary: ['', Validators.required],
    details: ['']
  })

  onSubmit() {

    // const formData: any = new FormData();

    // Populate FormData
    // for (const element in this.maintenanceForm.value) {
    //   // console.log(element + ': ' + this.maintenanceForm.value[element])
    //   formData.append(element, this.maintenanceForm.value[element])
    // }

    // Only send POST request if form is valid
    if (this.maintenanceForm.valid) {
      console.log(this.maintenanceForm.value)
      this.http.post('http://localhost:3333/api/maintenance-requests/', this.maintenanceForm.value).subscribe(
        (response) => console.log(response),
        // {
        //   if (response) {
        //     this.maintenanceForm.reset()
        //   }
        // },
        (error) => console.log(error)
      )
    }
  }
  ngOnInit(): void {
    //
  }

}
