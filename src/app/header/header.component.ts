import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/data-types/user';
import { UserService } from '../services/user.service';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {

  searchValue = ""
  shortSearchResult:User[] = []

  constructor(private router:Router, private userService: UserService) {
   }
  ngDoCheck(): void {
    this.shortSearchResult = this.userService.findUsers(this.searchValue)
  }

  ngOnInit() {
  }

  onSearch(){
    this.router.navigateByUrl(`search/${this.searchValue}`)
  }

}
