import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/data-types/post';
import { User } from 'src/data-types/user';
import { PostComponent } from '../post/post.component';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnDestroy{

  posts:Post[] = []
  user?:User
  userSub?:Subscription
  feedSub?:Subscription

  set registration(b:boolean){
    this.registration = b
  }

  extractUserFeed(list:Post[]){
    return list.filter(p=>this.user?.following.includes(p.user) || p.user === this.user?.nickname)
  }

  constructor(private session:SessionService, private postService:PostService) {

   }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe()
  }

  ngOnInit(): void{
    this.userSub = this.session.emitter.subscribe(next=>{
      this.user = next
      //extracts and sorts feed
      this.posts = PostService.sortByNewest(
        this.extractUserFeed(this.postService.posts)
      )
    })
  }
}
