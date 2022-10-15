import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchResultsComponent } from './search-results/search-results.component';


const routes: Routes = [
  {path:"", component:HomepageComponent},
  {path:"user/:nickname", component:ProfileComponent},
  {path:"search/:searchValue", component:SearchResultsComponent},
  {path:"**", redirectTo:"pagina inesistente"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
