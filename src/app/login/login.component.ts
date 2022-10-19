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

  get emailInvalidMessage(){
    const email = this.isLogin ? this.login.get('email') : this.registration.get('email')
    if(!email) return null

    if(email.getError('email')) return "email is invalid"
    if(email.getError('emailUsed')) return "email already in use"
    return null
  }

  get nameInvalidMessage(){
    const name = this.isLogin ? this.login.get('nickname') : this.registration.get('nickname')
    if(!name) return null

    if(name.value!.length > 20) return "nickname must not exceed the lenght of 20 characters"
    if(name.value!.length < 4) return "nickname must be atleast 4 characters long"
    if(name.getError('nameUsed')) return "nickname is already in use"
    return null
  }

  get toggleLogin(){
    return this.isLogin = !this.isLogin
  }

  get formLogEmpty(){
    return !this.login.valid
  }

  get formRegEmpty(){
    return !this.registration.valid
  }

  constructor(private userService:UserService, private session:SessionService) {
    this.login = new FormGroup({
      'email': new FormControl("", [Validators.required, Validators.email]),
      'password': new FormControl("", [Validators.required])
    })
    this.registration = new FormGroup({
      'nickname': new FormControl("",[Validators.required, Validators.maxLength(20), Validators.minLength(4),
      this.isNameUsed.bind(this)]),
      'email': new FormControl("",[Validators.required, Validators.email, this.isEmailUsed.bind(this)]),
      'password': new FormControl("",[Validators.required]),
      'passwordConfirmation': new FormControl("",[Validators.required]),
    })
  }

  private isNameUsed(control:FormControl){
    if(this.userService.users.filter(u=>u.nickname === control.value).length > 0) return {nameUsed:true}
    return null
  }

  private isEmailUsed(control:FormControl){
    if(this.userService.users.filter(u=>u.email === control.value).length > 0) return {emailUsed:true}
    return null
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
