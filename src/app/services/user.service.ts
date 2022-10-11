import { Injectable } from '@angular/core';
import { User } from 'src/data-types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _users:User[] = []

  constructor() {
    this._users.push({
      nickname: "amogus",
      email: "amogus@gmail.com",
      password: "amogus",
    })
  }

  add(u:User){
    if(this._users.filter(e => e.email === u.email)) return new Error("l'utente già esiste")
    this._users.push(u)
  }

  getUserByMail(email:string){
    const result = this._users.filter(e => e.email === email)
    result.forEach(e => e.password = "")
    
    return [...result]
  }
}
