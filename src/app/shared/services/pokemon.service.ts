import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';

import { PokemonList } from './../models/pokemon-list.model';
import { PokemonEntry } from '../models/pokemon-entry.model';

import { Pokemon } from '../models/pokemon';
import { PokemonAbilityInfo } from '../models/pokemon-ability-info';
import { PokemonAbility } from '../models/pokemon-ability';
import { PokemonDescription } from '../models/pokemon-description';
import { PokemonType } from '../models/pokemon-type';
import { PokemonStats } from '../models/pokemon-stats';



@Injectable()
export class PokemonService {

  // private _baseUrl: string = 'pokeapi';
  private _spriteBaseUrl: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other-sprites/official-artwork';
  private _detailRegex = /^https:\/\/pokeapi.co\/api\/v2\/pokemon\/(\d+)\/$/;
  private _language = 'en';

  constructor(private http: Http) {}

  findAll(offset: number,  limit: number): Observable<PokemonList> {
    const params = [
      `limit=${limit}`,
      `offset=${offset}`
    ].join('&');
    const queryUrl = `pokeapi/pokemon/?${params}`;
    return this.http.get(queryUrl)
      .map(res => res.json())
      .map(results => this.getList(results));
  }

  findOne(id: number): Observable<Pokemon> {
    return Observable.forkJoin(
      this.http.get(`pokeapi/pokemon/${id}/`).map(response => response.json()),
      this.http.get(`pokeapi/pokemon-species/${id}/`).map(response => response.json())
    ).map(data => new Pokemon(
      new PokemonEntry(data[0].id, _.capitalize(data[0].name), `${this._spriteBaseUrl}/${data[0].id}.png`),
      new PokemonAbilityInfo(data[0].height, data[0].weight, this.getAbilities(data[0].abilities), this.getCategory(data[1].genera)),
      this.getDescriptions(data[1]['flavor_text_entries']),
      this.getTypes(data[0].types),
      this.getStats(data[0].stats)
    ));
  }

  getEntry(data): PokemonEntry {
    const matches = this._detailRegex.exec(data.url),
          id = matches == null ? null : parseInt(matches[1]),
          sprite = id == null ? null : `${this._spriteBaseUrl}/${id}.png`;
    return new PokemonEntry(id, _.capitalize(data.name), sprite);
  }

  getList(data): PokemonList {
    return new PokemonList(data.results.map(result => this.getEntry(result)), data.count);
  }


  getAbilities(abilities: any[]): PokemonAbility[] {
    return abilities
      .map(ability => new PokemonAbility(_.startCase(ability.ability.name), ability['is_hidden'], ability.slot))
      .sort((ability1, ability2) => ability1.order - ability2.order);
  }

  getCategory(genera: any[]): string {
    return genera
      .find(genera => genera.language.name === this._language)
      .genus;
  }

  getDescriptions(entries: any[]): PokemonDescription[] {
    return entries
      .filter(entry => entry.language.name === this._language)
      .map(entry => new PokemonDescription(entry['flavor_text'], _.startCase(_.replace(entry.version.name, '-', ' '))));
  }

  getTypes(types: any[]): PokemonType[] {
    return types
      .map(type => new PokemonType(type.type.name, type.slot))
      .sort((type1, type2) => type1.order - type2.order);
  }

  getStats(stats: any[]): PokemonStats {
    return new PokemonStats(
      stats.find(stat => stat.stat.name === 'hp')['base_stat'],
      stats.find(stat => stat.stat.name === 'attack')['base_stat'],
      stats.find(stat => stat.stat.name === 'defense')['base_stat'],
      stats.find(stat => stat.stat.name === 'special-attack')['base_stat'],
      stats.find(stat => stat.stat.name === 'special-defense')['base_stat'],
      stats.find(stat => stat.stat.name === 'speed')['base_stat']
    );
  }

}