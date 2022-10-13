import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, NgModel, Validators } from '@angular/forms';
import { User } from 'src/data-types/user';
import { UserService } from '../services/user.service';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, DoCheck {

  @ViewChild("loginForm") loginForm?:NgForm
  @ViewChild("registrationForm") registrationForm?:NgForm
  protected formEmail: string = ""
  protected formPassword:string = ""
  protected formPasswordConf:string = ""
  protected formNickname:string = ""
  registration = false

  get formLogEmpty(){
    return this.loginForm?.status === "INVALID"
  }

  get formRegEmpty(){
    return this.registrationForm?.status === "INVALID"
  }

  constructor(private userService:UserService, private session:SessionService) {
  }
  
  ngDoCheck(): void {
    
  }

  ngOnInit(): void {
    
  }

  onRegistration(form: NgForm) {
    const users = this.userService.users
    const userReg = {
      nickname: this.formNickname,
      email: this.formEmail,
      password: this.formPassword
    }    
    
    if(users.filter(u=>u.nickname === userReg.nickname).length>0){
      alert("il nickname è già in uso")
      return
    }
    if(users.filter(u=>u.email === userReg.email).length>0){
      alert("esiste già un account con questa email")
      return
    }
    if(userReg.password !== this.formPasswordConf){
      alert("le password devono coincidere")
      return
    }

    this.userService.add(userReg)
    this.registration = !this.registration
  }


  onLogin(form:NgForm){
    const userLog = {
      nickname:"",
      email:this.formEmail,
      password:this.formPassword
    }
    const result = this.userService.validate(userLog)
    if(!result){
      alert("email o password sbagliate")
      return
    }
    
    this.session.user = result
  }

}
