import { Component, OnInit, Input } from '@angular/core';
import { PokemonDescription } from '../../shared/models/pokemon-description';

@Component({
  selector: 'app-pokemon-description',
  templateUrl: './pokemon-description.component.html'
})
export class PokemonDescriptionComponent implements OnInit {

  @Input() descriptions: PokemonDescription[];

  constructor() { }

  ngOnInit() {
  }

}
