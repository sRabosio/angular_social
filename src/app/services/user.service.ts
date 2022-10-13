import { Injectable } from '@angular/core';
import { User } from 'src/data-types/user';
import { FilterArrayPipe } from '../filter-array.pipe';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _users:User[] = []

  get users(){
    return [...this._users]
  }
  
  private getUser(email:string){
    return this._users.filter(e => e.email === email)[0]
  }


  constructor() {
    this._users.push({
      nickname: "amogus",
      email: "amogus@gmail.com",
      password: "amogus",
    })
  }

  //returns operation success (true/false)
  add(u:User){
    if(this.getUser(u.email)) return false
    this._users.push(u)
    return true
  }

  findUser(value: string){
    let result:User[] = []
    result = [...result, ...this._users.filter(e => e.email.search(value))]
    result = [...result, ...this._users.filter(e => e.nickname.search(value))]
    return result
  }

  //conferma che mail e password coincidano con un account presente nel db
  validate(u:User){
    const result = this.getUser(u.email)
    if(!result) return
    if(result.password === u.password) return {...result}
    return
  }
}
