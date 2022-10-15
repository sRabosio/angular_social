import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/data-types/user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input() user?:User

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  onClick(){
    this.router.navigateByUrl(`user/${this.user?.nickname}`)
  }

}
