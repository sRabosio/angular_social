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

  protected formEmail: string = ""
  protected formPassword:string = ""

  constructor() { }

  ngOnInit(): void {
  }

  onEvent(e:Event){
    const input = e.target as HTMLInputElement
    if(input.name !== "email") return
    const value = input.value
    const at = value.indexOf("@")
    if(at >= 0 && value.indexOf(".") > at) return
  }

  onLogin(email:HTMLInputElement, password:HTMLInputElement){
    console.log(`${email.value} ${password.value}`);
  }

}
