import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { observeNotification } from 'rxjs/internal/Notification';
import { User } from 'src/data-types/user';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  user?:User

  constructor(private userService:UserService) { }
}
