import { Component, OnInit, Input } from '@angular/core';
import { PokemonEntry } from '../../shared/models/pokemon-entry.model';

@Component({
  selector: 'app-pokemon-entry',
  templateUrl: './pokemon-entry.component.html'
})
export class PokemonEntryComponent implements OnInit {

  @Input() pokemon: PokemonEntry = null;

  constructor() { }

  ngOnInit() {
  }

}
