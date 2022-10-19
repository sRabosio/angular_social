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

  login:FormGroup
  registration:FormGroup
  isLogin = true
  get toggleLogin(){
    return this.isLogin = !this.isLogin
  }

  get formLogEmpty(){
    return this.login.status === "INVALID"
  }

  get formRegEmpty(){
    return this.registration.status === "INVALID"
  }

  constructor(private userService:UserService, private session:SessionService) {
    this.login = new FormGroup({
      'email': new FormControl("", [Validators.required, Validators.email]),
      'password': new FormControl("", [Validators.required])
    })
    this.registration = new FormGroup({
      'nickname': new FormControl("",[Validators.required, Validators.maxLength(20), Validators.minLength(4)]),
      'email': new FormControl("",[Validators.required, Validators.email]),
      'password': new FormControl("",[Validators.required]),
      'passwordConfirmation': new FormControl("",[Validators.required]),
    })

    this.formGroupLogs()
  }

  private formGroupLogs(){
    console.table({"login email": this.login.get('email'), "login password": this.login.get('password')} )
    console.table({
      "registration nickname": this.registration.get('nickname'),
      "registration email": this.registration.get('email'),
      "registration password": this.registration.get('password'),
      "registration password confirmation": this.registration.get('passwordConfirmation')})
  }

  ngDoCheck(): void {
  }

  ngOnInit(): void {

  }

  onRegistration() {
    const users = this.userService.users
    const userReg:User = {
      nickname: this.registration!.get('nickname')!.value,
      email: this.registration!.get('email')!.value,
      password: this.registration!.get('password')!.value,
      following: [],
      likedComments: [],
      likedPosts: []
    }

    if(users.filter(u=>u.nickname === userReg.nickname).length>0){
      alert("il nickname è già in uso")
      return
    }
    if(users.filter(u=>u.email === userReg.email).length>0){
      alert("esiste già un account con questa email")
      return
    }
    if(userReg.password !== this.registration!.get('passwordConfirmation')!.value){
      alert("le password devono coincidere")
      return
    }

    this.userService.add(userReg)
    this.isLogin = !this.isLogin
  }


  onLogin(){
    const userLog:User = {
      nickname:"",
      email:this.login!.get('email')!.value,
      password:this.login!.get('password')!.value,
      following: [],
      likedComments: [],
      likedPosts: []
    }
    const result = this.userService.validate(userLog)
    console.log("logging with", userLog);

    if(!result){
      alert("email o password sbagliate")
      return
    }

    this.session.user = result
  }

}
