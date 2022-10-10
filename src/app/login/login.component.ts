import { Component, OnInit } from '@angular/core';
import { User } from 'src/data-types/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  testUser:User = {
    nickname: "amogus",
    email: "amogus@gmail.com",
    password: "amogus",
  }

  private formEmail: string = ""
  private formPassword:string = ""

  constructor() { }

  ngOnInit(): void {
  }

}
