import { Component, OnInit, Input } from '@angular/core';
import { PokemonAbilityInfo } from '../../shared/models/pokemon-ability-info';

@Component({
  selector: 'app-pokemon-ability-info',
  templateUrl: './pokemon-ability-info.component.html'
})
export class PokemonAbilityInfoComponent implements OnInit {

  @Input() info: PokemonAbilityInfo;

  constructor() { }

  ngOnInit() {
  }

}
