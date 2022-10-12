import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/data-types/user';
import { UserService } from '../services/user.service';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  protected formEmail: string = ""
  protected formPassword:string = ""

  get formEmpty(){
    return this.formEmail === "" || this.formPassword === ""
  }

  constructor(private userService:UserService, private session:SessionService) { }

  ngOnInit(): void {
  }

  onEvent(e:Event){
    const input = e.target as HTMLInputElement
    if(input.name !== "email") return
    const value = input.value
    const at = value.indexOf("@")
    if(at >= 0 && value.indexOf(".") > at) return
  }

  onLogin(form:NgForm){
    const userLog = {
      nickname:"",
      email:"",
      password:""
    }
    
    this.session.user = userLog
  }
}
