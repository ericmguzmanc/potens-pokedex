import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../shared/services/pokemon.service';
import { PokemonList } from '../shared/models/pokemon-list.model';

@Component({
  selector: 'pokemon',
  templateUrl: './pokemon.component.html'
})
export class PokemonComponent implements OnInit {
  
  pokemonList: PokemonList;

  constructor(private pokemonService: PokemonService){}
  
  ngOnInit(): void {
    this.findAll();
  }
  
  findAll(): void {
    this.pokemonService.findAll(0, 10)
      .subscribe( (pokemons) => {
        this.pokemonList = pokemons;
        console.log(pokemons);
      });
      
  }


}