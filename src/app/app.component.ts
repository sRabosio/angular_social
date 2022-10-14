import { Component } from '@angular/core';
import { User } from 'src/data-types/user';
import { SessionService } from './session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular_social';
  user?:User

  fetchUser = new Promise(()=>{
    let sessionUser: User | undefined
    const i = setInterval(()=>{
      sessionUser = this.session.user
      if(sessionUser){
        this.user = sessionUser
        clearInterval(i)
      } 
    },1000)
  })

  constructor(private session:SessionService){

  }
}
