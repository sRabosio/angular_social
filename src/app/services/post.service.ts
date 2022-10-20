import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Post } from 'src/data-types/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  //NB: use add function to modify posts
  private _posts:Post[] = []
  private idCounter = 0

  get posts(){
    return [...this._posts]
  }
  emitter = new Subject<Post[]>()

  static sortByNewest(pp:Post[]){
    return pp.sort((p1, p2)=> (p1.date.getTime() - p2.date.getTime())*-1)
  }

  getPostByUser(nickname:string){
    return this.posts.filter(p=>p.user === nickname)
  }

  getPostByTitle(title:string){
    return this.posts.filter(p=>p.title.search(title)>=0)
  }

  constructor() {

   }

  addPost(p:Post){
    p.id = this.idCounter++
    this._posts.push(p)
    this.emitter.next(this.posts)

  }

}
