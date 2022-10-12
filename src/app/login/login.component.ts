import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { User } from 'src/data-types/user';
import { UserService } from '../services/user.service';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, DoCheck {

  @ViewChild("f") loginForm?:NgForm
  
  protected formEmail: string = ""
  protected formPassword:string = ""

  get formEmpty(){
    return this.loginForm?.status === "INVALID"
  }

  constructor(private userService:UserService, private session:SessionService) {
    
   }
  
  ngDoCheck(): void {
      
  }

  ngOnInit(): void {
  }

  //da eliminare???
  onEvent(e:Event){
    const input = e.target as HTMLInputElement
    if(input.name !== "email") return
    const value = input.value
    const at = value.indexOf("@")
    if(at >= 0 && value.indexOf(".") > at) return
  }

  onLogin(form:NgForm){
    //TODO: tira fuori dal form i parametri
    const userLog = {
      nickname:"",
      email:this.formEmail,
      password:this.formPassword
    }
    
    this.session.user = userLog
  }
}
