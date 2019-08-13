import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];

  constructor( private heroesService: HeroesService ) { }

  ngOnInit() {
    this.heroesService.getHeroes()
                      .subscribe( respuesta => {
                        this.heroes = respuesta;
                      });
  }

  borrarHeroe( heroe: HeroeModel, idx: number ) {
    Swal.fire({
      title: 'Se va a borrar el heroe',
      text: '¿Está seguro?',
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( respuesta => {
      if ( respuesta.value ) {
        this.heroes.splice( idx, 1 );
        this.heroesService.borrarHeroe( heroe.id ).subscribe();
      }
    });
  }
}
