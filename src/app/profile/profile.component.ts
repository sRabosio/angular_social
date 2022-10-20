import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/data-types/post';
import { User } from 'src/data-types/user';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  //user of profile
  user:User
  postsSub?:Subscription
  posts:Post[] = []
  //current logged user viewing page
  sessionUser?:User
  sessionUserSub?:Subscription

  get followed(){
    if(!this.sessionUser) return false
    return this.sessionUser.following.filter(s=>s === this.user.nickname).length>0
  }

  constructor(private route:ActivatedRoute, private sessionService:SessionService, private userService:UserService, private postService:PostService, private router:Router) {

    this.sessionUser = sessionService.user
    this.user = userService.getUserByName(
      route.snapshot.params["nickname"]
    )
    if(!this.user) router.navigateByUrl("")

    this.posts = postService.getPostByUser(this.user.nickname)
    router.routeReuseStrategy.shouldReuseRoute = ()=>false
  }

  ngOnDestroy(): void {
        this.sessionUserSub?.unsubscribe()
    }

  ngOnInit(): void {

    this.postsSub = this.postService.emitter.subscribe(next=>{
      this.posts = next.filter(p=>p.user === this.user.nickname)
    })
    this.sessionUserSub = this.sessionService.emitter.subscribe(next=> this.sessionUser=next)
  }

  onFollow(){
    if(!this.sessionUser) return
    this.userService.toggleFollow(this.sessionUser.nickname, this.user.nickname)
  }

}
