import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../shared/services/pokemon.service';
import { PokemonEntry } from '../shared/models/pokemon-entry.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html'
})
export class PokemonListComponent implements OnInit {

  pokemons: PokemonEntry[];
  count: number  = 0;
  offset: number = 0;
  limit:  number = 10; 

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.findAll(this.offset, this.limit);
  }

  findAll(limit: number, offset: number): void {
    this.pokemonService.findAll(limit, offset)
      .subscribe( (pokemons) => {
        this.pokemons = pokemons.pokemons;
        this.count = pokemons.count
        console.log(pokemons);
      });
  }

  findOne(): void {
    this.pokemonService.findOne(1)
      .subscribe(pokemon => console.log('pokemon ', pokemon));
  }
}
