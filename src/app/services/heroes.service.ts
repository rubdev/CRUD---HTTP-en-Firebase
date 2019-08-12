import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://ngcrudapp-34f3f.firebaseio.com';

  constructor( private http: HttpClient ) { }

  crearHeroe( heroe: HeroeModel ) {
    return this.http.post( `${this.url}/heroes.json`, heroe )
                    .pipe(
                      map( ( respuesta: any ) => {
                        heroe.id = respuesta.name;
                        return heroe;
                      })
                    );
  }

  actualizarHeroe( heroe: HeroeModel ) {
    const heroeTemporal = {
      ...heroe
    };
    delete heroeTemporal.id;
    return this.http.put( `${ this.url }/heroes/${ heroe.id }.json`, heroeTemporal );
  }

  getHeroes() {
    return this.http.get(`${ this.url }/heroes.json`)
                    .pipe(
                      map( respuesta => this.toArray( respuesta ) )
                    );
  }

  private toArray( heroesObj: object ) {
    const heroes: HeroeModel[] = [];
    if ( heroesObj === null ) {
      return [];
    }
    return 
  }

}
