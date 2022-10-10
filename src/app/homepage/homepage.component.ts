import { Component, OnInit } from '@angular/core';
import { Post } from 'src/data-types/post';
import { User } from 'src/data-types/user';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  posts?:Post[]
  user?:User

  constructor() { }

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
