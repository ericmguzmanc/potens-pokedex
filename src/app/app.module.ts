import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
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
import { PokemonItemsComponent } from './pokemon-items/pokemon-items.component';
import { PokemonBerriesComponent } from './pokemon-berries/pokemon-berries.component';
import { UserComponent } from './user/user.component';
import { PokemonService } from './shared/services/pokemon.service';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonEntryComponent } from './pokemon-list/pokemon-entry/pokemon-entry.component';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { PokemonInfoComponent } from './pokemon-info/pokemon-info.component';
import { PokemonAbilityInfoComponent } from './pokemon-info/pokemon-ability-info/pokemon-ability-info.component';
import { FeetPipe } from './shared/metrics/feet.pipe';
import { PoundPipe } from './shared/metrics/pound.pipe';
import { PokemonDescriptionComponent } from './pokemon-info/pokemon-description/pokemon-description.component';
import { LoaderComponent } from './shared/loader/loader.component';


const routes: Routes = [
  {path: '', redirectTo: 'pokemon', pathMatch: 'full'},
  {path: 'pokemon', component: PokemonListComponent},
  {path: 'pokemon/:id', component: PokemonInfoComponent},
  {path: 'berries', component: PokemonBerriesComponent},
  {path: 'items', component: PokemonItemsComponent},
  {path: 'user', component: UserComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    PokemonBerriesComponent,
    PokemonItemsComponent,
    UserComponent,
    PokemonListComponent,
    PokemonEntryComponent,
    PaginationComponent,
    PokemonInfoComponent,
    PokemonAbilityInfoComponent,
    FeetPipe,
    PoundPipe,
    PokemonDescriptionComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: PokemonService, useClass: PokemonService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
