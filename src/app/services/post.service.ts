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
    return [...this._posts]
  }
  emitter = new Subject<Post[]>()

  getPostByUser(nickname:string){
    return this.posts.filter(p=>p.user === nickname)
  }

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
      user: "ciao",
      title: "amg",
      text: "Il pollo è il miglior cibo senza ombra di dubbio",
      date: new Date()
    }
  }
}
