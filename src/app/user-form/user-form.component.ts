import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RegistrationComponent } from '../registration/registration.component';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  registration = false

  get toggleForm(){
    this.registration = !this.registration
    return this.registration
  }

  constructor(private regComp:RegistrationComponent, private loginComp:LoginComponent) { }

  ngOnInit(): void {
  }

}
