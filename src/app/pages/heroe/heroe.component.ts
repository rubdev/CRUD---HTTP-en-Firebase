import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();

  constructor( private heroesService: HeroesService ) { }

  ngOnInit() {
  }

  guardar( f: NgForm ) {
    if ( f.invalid ) {
      console.log('Formulario no válido');
      return;
    }
    // console.log( f );
    // console.log( this.heroe );
    if ( this.heroe.id ) {
      this.heroesService.actualizarHeroe( this.heroe )
                        .subscribe ( respuesta => {
                          console.log( respuesta );
                        });
    } else {
      this.heroesService.crearHeroe( this.heroe )
                        .subscribe( respuesta => {
                          console.log( respuesta );
                        });
    }
  }

}
