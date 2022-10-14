import { Component, OnInit } from '@angular/core';
import { Post } from 'src/data-types/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  post?:Post

  constructor(){
   }

  ngOnInit(): void {
    
  }
}
