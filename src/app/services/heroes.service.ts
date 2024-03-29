import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators';


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

  borrarHeroe( id: string ) {
    return this.http.delete( `${ this.url }/heroes/${ id }.json` );
  }

  getHeroes() {
    return this.http.get(`${ this.url }/heroes.json`)
                    .pipe(
                      map( respuesta => this.toArray( respuesta ) ),
                      delay( 1500 )
                    );
  }

  getHeroe( id: string ) {
    return this.http.get(`${ this.url }/heroes/${ id }.json`);
  }

  private toArray( heroesObj: object ) {
    const heroes: HeroeModel[] = [];
    if ( heroesObj === null ) {
      return [];
    }
    Object.keys( heroesObj ).forEach( key => {
      const heroe: HeroeModel = heroesObj[ key ];
      heroe.id = key;
      heroes.push( heroe );
    });
    return heroes;
  }

}
