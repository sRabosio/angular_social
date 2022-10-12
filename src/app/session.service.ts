import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { User } from 'src/data-types/user';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  user?:User
  promise = new Observable<User>(obs=>{
    setInterval(()=>{
      console.log("observable", this.user);
      if(!this.user) return
      const authRes = this.userService.validate(this.user)
      if(!authRes) return
      obs.next(authRes)
      obs.complete
    }, 500)
  })

  constructor(private userService:UserService) { }
}
