import { Component, OnInit } from '@angular/core';
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
export class ProfileComponent implements OnInit {

  user:User
  postsSub?:Subscription
  posts:Post[] = []

  constructor(private route:ActivatedRoute, private userService:UserService, private postService:PostService, private router:Router) { 
    this.user = userService.getUserByName(
      route.snapshot.params["nickname"]
    )
    if(!this.user) router.navigateByUrl("")
    console.log(this.user);
    
    this.posts = postService.getPostByUser(this.user.nickname)
  }

  ngOnInit(): void {
    this.postsSub = this.postService.emitter.subscribe(next=>{
      this.posts = next.filter(p=>p.user === this.user.nickname)
    })
  }

}
