import { Component, OnInit } from '@angular/core';
import { Post } from 'src/data-types/post';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  posts?:Post[]

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
