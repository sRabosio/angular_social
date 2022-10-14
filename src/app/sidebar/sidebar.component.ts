import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/data-types/user';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  user?:User
  userSub?:Subscription

  constructor(private session:SessionService) {
  }
  ngOnDestroy(): void {
    this.userSub?.unsubscribe()
  }

  ngOnInit(): void {
    this.userSub = this.session.emitter.subscribe(next=>{this.user = next
    })
  }

  killUser(){
    this.session.killUser()
  }

}
