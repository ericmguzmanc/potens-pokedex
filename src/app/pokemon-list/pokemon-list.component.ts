import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../shared/services/pokemon.service';
import { PokemonEntry } from '../shared/models/pokemon-entry.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html'
})
export class PokemonListComponent implements OnInit {
  
  loading: boolean = false;
  pokemons: PokemonEntry[];
  count: number  = 0;
  offset: number = 0;
  limit:  number = 20; 

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.findAll(this.offset, this.limit);
  }

  findAll(limit: number, offset: number): void {
    this.pokemons = [];
    this.loading = true;
    this.pokemonService.findAll(limit, offset)
      .subscribe( (pokemons) => {
        this.pokemons = pokemons.pokemons;
        this.count = pokemons.count;
        this.loading = false;
      }, () => this.loading = false);
  }

  findOne(): void {
    this.loading = true;
    this.pokemonService.findOne(1)
      .subscribe((pokemon) => {
        console.log('pokemon ', pokemon);
        this.loading = false;
      }, () => this.loading = false);
  }

  onPageChange(offset): void {
    this.offset = offset;
    this.findAll(offset, this.limit);
  }
}
