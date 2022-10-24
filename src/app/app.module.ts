import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PostComponent } from './post/post.component';
import { CommentComponent } from './comment/comment.component';
import { ProfileComponent } from './profile/profile.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NewPostComponent } from './new-post/new-post.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { PopupComponent } from './popup/popup.component';
import { FilterArrayPipe } from './filter-array.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { UserCardComponent } from './user-card/user-card.component';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    PostComponent,
    CommentComponent,
    ProfileComponent,
    SidebarComponent,
    NewPostComponent,
    PostsListComponent,
    RegistrationComponent,
    LoginComponent,
    PopupComponent,
    FilterArrayPipe,
    HeaderComponent,
    SearchResultsComponent,
    UserCardComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
