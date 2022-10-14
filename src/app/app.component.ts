import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/data-types/user';
import { SessionService } from './session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular_social';
  user?:User
  userSub?:Subscription

  constructor(private session:SessionService){
    this.userSub = this.session.emitter.subscribe(next=>this.user = next)
  }
  ngOnInit(): void {
    
  }
  ngOnDestroy(): void {
    this.userSub?.unsubscribe()
  }


}
