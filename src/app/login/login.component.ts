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
  isLoginPasswordWrong = false

  get emailInvalidMessage(){
    const email = this.registration.get('email')
    if(!email) return null

    if(email.getError('email')) return "enter a valid email"
    if(email.getError('emailUsed')) return "email already in use"
    return null
  }

  get emailLoginInvalidMessage(){
    const email = this.login.get('email')
    if(!email) return null

    console.log(email.getError('userDoesntExists'));


    if(email.getError('email')) return "enter a valid email"
    if(email.getError('userDoesntExists')) return "accont doesn't exixst, try registering"

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

  get passwordConfInvalidMessage(){
    const passConf = this.isLogin ? this.login.get('passwordConfimation') : this.registration.get('passwordConfirmation')
    if(!passConf) return null

    if(passConf.getError('passwordsDontMatch')) return "passwords must match"
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
      'email': new FormControl("", [Validators.required, Validators.email, this.doesUserExists.bind(this)]),
      'password': new FormControl("", [Validators.required])
    })
    this.registration = new FormGroup({
      'nickname': new FormControl("",[Validators.required, Validators.maxLength(20), Validators.minLength(4),
      this.isNameUsed.bind(this)]),
      'email': new FormControl("",[Validators.required, Validators.email, this.isEmailUsed.bind(this)]),
      'password': new FormControl("",[Validators.required]),
      'passwordConfirmation': new FormControl("",[Validators.required, this.doPasswordsMatch.bind(this)])
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

  private doesUserExists(control:FormControl){
    if(this.userService.users.filter(u=>u.email  === control.value).length <= 0) return {userDoesntExists: true}
    return null
  }

  //confimation password only
  private doPasswordsMatch(control:FormControl){
    if(control?.value === this.registration?.get('password')?.value) return null
    return {passwordsDontMatch: true}
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
      followers: [],
      likedComments: [],
      likedPosts: []
    }

    this.userService.add(userReg)
    this.registration.reset()
    this.isLogin = !this.isLogin
  }

  onLogin(){

    const userLog:User = {
      nickname:"",
      email:this.login!.get('email')!.value,
      password:this.login!.get('password')!.value,
      following: [],
      followers: [],
      likedComments: [],
      likedPosts: []
    }
    const result = this.userService.validate(userLog)

    if(!result){
      this.isLoginPasswordWrong = true
      return
    }
    this.isLoginPasswordWrong = false
    this.session.user = result
  }

}
