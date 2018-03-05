import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';

import { PokemonList } from './../models/pokemon-list.model';
import { PokemonEntry } from '../models/pokemon-entry.model';



@Injectable()
export class PokemonService {

  // private _baseUrl: string = 'http://pokeapi.co/api/v2';
  private _spriteBaseUrl: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other-sprites/official-artwork';
  private _detailRegex = /^https:\/\/pokeapi.co\/api\/v2\/pokemon\/(\d+)\/$/;

  constructor(private http: Http) {

  }

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

  getEntry(data): PokemonEntry {
    console.log('pokemon ', data)
    const matches = this._detailRegex.exec(data.url),
          id = matches == null ? null : parseInt(matches[1]),
          sprite = id == null ? null : `${this._spriteBaseUrl}/${id}.png`;
    return new PokemonEntry(id, _.capitalize(data.name), sprite);
  }

  getList(data): PokemonList {
    return new PokemonList(data.results.map(result => this.getEntry(result)), data.count);
  }

}