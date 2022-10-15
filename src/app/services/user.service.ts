import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'src/data-types/user';
import { FilterArrayPipe } from '../filter-array.pipe';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _users:User[] = []

  emitter = new Subject<User[]>()

  get users(){
    return [...this._users]
  }

  public getUserByName(nickname:string){
    return this._users.filter(e => e.nickname === nickname)[0]
  }

  getUserByEmail(email:string){
    return this._users.filter(e=>e.email === email)[0]
  }

  constructor() {
    this._users.push({
      nickname: "amogus",
      email: "amogus@gmail.com",
      password: "amogus",
      following: ["ciao"],
      likedComments: [],
      likedPosts: []
    },
    {
      nickname: "ciao",
      email: "ciao",
      password: "ciao",
      following: [],
      likedComments: [],
      likedPosts: []
    },)
  }

  //returns operation success (true/false)
  add(u:User){
    if(this.getUserByEmail(u.email) || this.getUserByName(u.nickname)) return false
    this._users.push(u)
    this.emitter.next(this.users)
    return true
  }

  toggleFollow(nick:string, followed:string){
    
    const user = this.getUserByName(nick)
    if(!user) return
    
    const l1 = user.following.length
    const a = user.following.filter(s=>s!==followed)
    if(a.length !== l1){
      user.following = a
      this.emitter.next(this.users)
      return
    }

    user.following.push(followed)
    this.emitter.next(this.users)    
  }

  findUsers(value: string){
    if(+value === 0) return []
    return [...this._users.filter(e => e.nickname.search(value)>=0)]
  }

  //conferma che mail e password coincidano con un account presente nel db
  validate(u:User){
    const result = this.getUserByEmail(u.email)
    if(!result) return
    if(result.password === u.password) return {...result}
    return
  }
}
