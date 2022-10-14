import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/data-types/post';
import { User } from 'src/data-types/user';
import { PostComponent } from '../post/post.component';
import { PostService } from '../services/post.service';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnDestroy{

  posts:Post[] = []
  user?:User
  feedSub?:Subscription

  set registration(b:boolean){
    this.registration = b
  }

  
  fetchUser = new Promise(()=>{
    let sessionUser: User | undefined
    const i = setInterval(()=>{
      sessionUser = this.session.user
      if(sessionUser){
        this.user = sessionUser
        this.posts = this.extractUserFeed(this.postService.posts)
        clearInterval(i)
      } 
    },1000)
  })

  extractUserFeed(list:Post[]){
    return list.filter(p=>this.user?.following.includes(p.user.nickname) || p.user === this.user)
  }

  constructor(private session:SessionService, private postService:PostService) {
    
   }

  ngOnDestroy(): void {
    this.feedSub!.unsubscribe()
  }

  ngOnInit(): void{
    
    this.feedSub = this.postService.emitter.subscribe(next=>{
      this.posts = this.extractUserFeed(next)
    })
  }
}
