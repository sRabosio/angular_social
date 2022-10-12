import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { observeNotification } from 'rxjs/internal/Notification';
import { User } from 'src/data-types/user';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  user?:User
  promise = new Observable<User>(obs=>{
    const i = setInterval(()=>{
      console.log("observable", this.user);
      if(!this.user) return

      const authRes = this.userService.validate(this.user)
      if(!authRes) return
      
      obs.next(authRes)
      clearInterval(i)
      obs.unsubscribe()
    }, 1000)
  })

  constructor(private userService:UserService) { }
}
