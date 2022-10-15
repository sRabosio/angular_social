import { Injectable } from '@angular/core';
import { interval, Observable, Subject, Subscription } from 'rxjs';
import { observeNotification } from 'rxjs/internal/Notification';
import { User } from 'src/data-types/user';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private _user?:User
  
  get user(){
    return {...this._user!}
  }

  set user(u:User){
    this._user = u
  }

  emitter = new Observable<User>(obs=>{
    setInterval(()=>{
      obs.next(this._user)
    }, 1000)
  })

  killUser(){
    this._user = undefined
  }

  constructor(private userService:UserService) {
    userService.emitter.subscribe(next=>{
      this.user = userService.getUserByName(this.user.nickname)
    })
   }
}
