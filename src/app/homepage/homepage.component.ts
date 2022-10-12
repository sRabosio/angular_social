import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/data-types/post';
import { User } from 'src/data-types/user';
import { PostComponent } from '../post/post.component';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnDestroy {

  posts?:Post[]
  user?:User
  userSub = this.session.promise.subscribe({
    next: val=>this.user = val
  })  


  constructor(private session:SessionService) { }
  ngOnDestroy(): void {
    this.userSub.unsubscribe
  }

  ngOnInit(): void{
    

    this.posts = [
      PostComponent.samplePost(),
      PostComponent.samplePost(),
      PostComponent.samplePost(),
      PostComponent.samplePost(),
      PostComponent.samplePost(),
      PostComponent.samplePost()
    ]
  }
}
