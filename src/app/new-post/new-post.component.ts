import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, NgModel, Validators } from '@angular/forms';
import { Post } from 'src/data-types/post';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit, DoCheck {

  form:FormGroup
  protected postTitle:string = ""

  constructor(private userService:UserService, private postService:PostService, private session:SessionService) { 
    this.form = new FormGroup({
      'postTitle': new FormControl('',[Validators.required, Validators.maxLength(50)]),
      'postContent': new FormControl('',[Validators.required, Validators.maxLength(300)])
    })
  }
  ngDoCheck(): void {        
  }

  ngOnInit(): void {
  }

  onPost(){
    if(!this.session.user){
      alert("l'utente non esiste!")
      return
    }
    const post:Post = {
      user: this.session.user,
      title: this.form.get('postTitle')!.value,
      text: this.form.get('postContent')!.value,
      date:new Date()
    }
    console.log(post);
    
    this.postService.addPost(post)
    this.form.reset()
  }

}
