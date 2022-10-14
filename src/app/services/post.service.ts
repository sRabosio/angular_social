import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Post } from 'src/data-types/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private _posts:Post[] = []
  get posts(){
    this._posts.sort((p1, p2)=> (p1.date.getTime() - p2.date.getTime())*-1)
    console.log(this._posts);  
    return [...this._posts]
  }
  emitter = new Subject<Post[]>()

  constructor() {
      this._posts = [
      this.samplePost(),
      this.samplePost(),
      this.samplePost(),
      this.samplePost(),
      this.samplePost(),
      this.samplePost(),
      this.samplePost(),
    ]
   }

  addPost(p:Post){
    this._posts.push(p)
    this.emitter.next(this.posts)
  }

  samplePost():Post{
    return {
      user: {
        nickname: "ciao",
        email: "ciao",
        password: "ciao",
        following: [],
        likedComments: [],
        likedPosts: []
      },
      title: "amg",
      text: "Il pollo è il miglior cibo senza ombra di dubbio",
      date: new Date()
    }
  }
}
