import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Post } from 'src/data-types/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private _posts:Post[] = []
  get posts(){
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
    this.emitter.next(this._posts)
  }

  samplePost():Post{
    return {
      user: {
        nickname: "ciao",
        email: "ciao",
        password: "ciao"
      },
      title: "amg",
      text: "Il pollo è il miglior cibo senza ombra di dubbio"
    }
  }
}
