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

  set registration(b:boolean){
    this.registration = b
  }

  
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

  constructor(private session:SessionService) { }
  ngOnDestroy(): void {
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
