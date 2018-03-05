import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  RouterModule, 
  ActivatedRoute,
  Routes
} from '@angular/router';
import { 
  Http,
  HttpModule
 } from '@angular/http';
import { AppComponent } from './app.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';


import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { PokemonItemsComponent } from './pokemon-items/pokemon-items.component';
import { PokemonBerriesComponent } from './pokemon-berries/pokemon-berries.component';
import { UserComponent } from './user/user.component';
import { PokemonService } from './shared/services/pokemon.service';


const routes: Routes = [
  {path: '', redirectTo: 'pokemon', pathMatch: 'full'},
  {path: 'pokemon', component: PokemonComponent},
  {path: 'berries', component: PokemonBerriesComponent},
  {path: 'items', component: PokemonItemsComponent},
  {path: 'user', component: UserComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    PokemonComponent,
    PokemonBerriesComponent,
    PokemonItemsComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: PokemonService, useClass: PokemonService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
