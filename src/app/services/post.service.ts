import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/data-types/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private _posts:Post[] = []
  get posts(){
    return [...this._posts]
  }

  fetchPosts(){
    
  }

  constructor() { }

  addPost(p:Post){
    this._posts.push(p)
  }
}
