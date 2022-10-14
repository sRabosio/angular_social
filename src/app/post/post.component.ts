import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/data-types/post';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post?:Post

  get user(){
    return this.userService.getUserByName(this.post?.user!)
  }

  constructor(private userService:UserService){
  }

  ngOnInit(): void {
    
  }
}
