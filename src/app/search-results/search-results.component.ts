import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/data-types/post';
import { User } from 'src/data-types/user';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  usersFound:User[]
  postsFound:Post[]

  constructor(private route:ActivatedRoute, private userService:UserService, private postService:PostService, private router:Router) {
    router.routeReuseStrategy.shouldReuseRoute = ()=>false
    const searchValue = this.route.snapshot.params["searchValue"]
    this.usersFound = this.userService.findUsers(searchValue)
    this.postsFound = this.postService.getPostByUser(searchValue)
   }

  ngOnInit(): void {
  }

}
