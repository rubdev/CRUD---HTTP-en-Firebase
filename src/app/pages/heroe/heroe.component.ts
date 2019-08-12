import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

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
    Swal.fire({
      title: 'Espere por favor',
      text: 'Se está guardando el heroe',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();
    let peticion: Observable<any>;
    if ( this.heroe.id ) {
      peticion = this.heroesService.actualizarHeroe( this.heroe );
    } else {
      peticion = this.heroesService.crearHeroe( this.heroe );
    }
    peticion.subscribe( respuesta => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Heroe actualizado',
        type: 'success'
      });
    });
  }

}
