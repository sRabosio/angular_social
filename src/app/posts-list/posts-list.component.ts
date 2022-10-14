import { Component, OnInit } from '@angular/core';
import { Post } from 'src/data-types/post';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

  posts?:Post[]

  constructor() { }

  ngOnInit(): void {
  }

}
