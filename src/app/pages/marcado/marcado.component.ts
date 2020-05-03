import { Component, OnInit } from '@angular/core';
// servcios
import { RelojService } from '../../services/service.index';
import { MarcadoService } from '../../services/service.index';
import { MapService } from '../../services/service.index';

// modelo
import { Marcado } from '../../models/marcado.model';

import { EmpleadosService } from '../../services/empleados/empleados.service';
import { Usuario } from '../../models/usuario.model';
import { ErrorService } from '../../services/errors/error.service';
import swal from 'sweetalert';
/**
 * Componente para el mantenimiento de marcados.
 */
@Component({
  selector: 'app-marcado',
  templateUrl: './marcado.component.html',
  styles: [],
})
export class MarcadoComponent implements OnInit {
  hayMarcado: boolean;
  hayPausa: boolean;

  usuario: Usuario = JSON.parse(localStorage.getItem('usuario'));

  fechaActual: Date = new Date();
  marcadoActual: Marcado;
  pausa: Marcado;

  idEmpleado: string;
  longitud: string;
  latitud: string;

  constructor(
    public _relojService: RelojService,
    public _marcadoService: MarcadoService,
    public _mapService: MapService,
    public _empleadoService: EmpleadosService,
    public _errorService: ErrorService
  ) {}
/**
 * Al iniciar obtenemos el empleado y los marcados del día en curso
 */
  ngOnInit(): void {
    // obtenemos el empleado.
    this._empleadoService.getEmpleadoByLogin(this.usuario.login).subscribe(
      (resp: any) => {

        this.idEmpleado = resp.empleado.idEmpleado;
        localStorage.setItem('idEmpleado', this.idEmpleado);
      },
      (err: any) => this._errorService.mostrarMensajeError(err.message),
      () => {

        const fecha = this.fechaActual
          .toLocaleString('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
          .replace('/', '-')
          .replace('/', '-');

        // obtenemos los marcados del empleado de la fecha actual y que no tengan hora final.
        this._marcadoService
          .marcadosEmpleado(this.idEmpleado, fecha)
          .subscribe((resp: any) => {

            this.compruebaMarcados(resp);
          });
      }
    );


  }
  /**
   * Comprueba que tipo de marcados tiene el empleado en caso de que tenga.
   * En caso de que no venga nada,resp.length = 0, borra los items pausa y marcado del localStorage si estaban y no hace nada más
   * si resp.lenght = 2 quiere decir que hay dos tipos de entrada y de pausa
   * si resp.lenght = 1 sólo hay de entrada.
   * @param resp 
   */
  compruebaMarcados(resp: any) {

    if (resp.length === 0) {
      localStorage.removeItem('pausa');
      localStorage.removeItem('marcado');
      this.hayPausa = false;
      this.hayMarcado = false;
      return;
    }
    // si no hay nada raro el array de marcados como mucho tendría que tener 2 elementos, una entrada y una pausa.
    if (resp.length === 2) {
      resp.forEach((element: any) => {
          if (element.tipo_marcaje.id === 3) {
          this.hayPausa = true;
          localStorage.setItem('pausa', JSON.stringify(element));
        }
          if (element.tipo_marcaje.id === 1) {
          this.hayMarcado = true;
          localStorage.setItem('marcado', JSON.stringify(element));
        }
      });
    }
    if (resp.length === 1) {
      if (resp[0].tipo_marcaje.id === 1) {
        this.hayMarcado = true;
        localStorage.setItem('marcado', JSON.stringify(resp[0]));
      }
    }
  }

  /**
   * Obtiene la localización actual
   */
  geolocalizar() {
    this._mapService.setCurrentLocation();
    this.longitud = this._mapService.longitude;
    this.latitud = this._mapService.latitude;
  }
  /**
   * Registra una entrada
   */
  entrada() {
    // leemos la fecha y la hora del reloj
    const fecha = this._relojService.vr.fecha;
    const hora =
      this._relojService.hours + ':' + this._relojService.vr.minutos + ':00';
    // obtener geolocalizacion
    this.geolocalizar();
    // crear marcado
    const marcado = new Marcado(
      fecha,
      '',
      hora,
      '',
      this.longitud,
      this.latitud,
      '1',
      this.idEmpleado
    );
    // insertar elmarcado en la bbdd
    this._marcadoService.crearMarcado(marcado).subscribe(
      (resp: any) => {
        
        localStorage.setItem('marcado', JSON.stringify(resp));
        this.hayMarcado = true;
      },
      (err: any) => {
        this._errorService.mostrarMensajeError(
          'No se ha podido regisrtar la entrada.'
        );
      }
    );
  }
/**
 * Registra una pausa
 */
  pausar() {
    if (!localStorage.getItem('marcado')) {
      return;
    }

    // leemos la fecha y la hora del reloj
    const fecha = this._relojService.vr.fecha;
    const hora =
      this._relojService.hours + ':' + this._relojService.vr.minutos + ':00';
    // obtener geolocalizacion
    this.geolocalizar();
    // crear marcado
    const marcado = new Marcado(
      fecha,
      '',
      hora,
      '',
      this.longitud,
      this.latitud,
      '3',
      this.idEmpleado
    );
    // insertar elmarcado en la bbdd
    this._marcadoService.crearMarcado(marcado).subscribe(
      (resp: any) => {
      
        localStorage.setItem('pausa', JSON.stringify(resp));
        this.hayPausa = true;
      },
      (err: any) => {
        this._errorService.mostrarMensajeError(
          'No se ha podido regisrtar la entrada.'
        );
      }
    );
  }
/**
 * Registra el final de una pausa
 */
  reanudar() {
    let marcado: Marcado ;
  
    if (!localStorage.getItem('pausa')) {
      return;
    }

    // leemos la fecha y la hora del reloj
    const fecha = this._relojService.vr.fecha;
    const hora =
      this._relojService.hours + ':' + this._relojService.vr.minutos + ':00';
    // obtener geolocalizacion
    this.geolocalizar();
    // obtenemos el marcado de pausa del localStorage
    if (localStorage.getItem('pausa')){
       marcado = JSON.parse(localStorage.getItem('pausa'));
         // actualiza el marcado
       marcado.horaFinal = hora;
       this._marcadoService.actualizaMarcado(marcado).subscribe(
         (resp: any) => {
          swal('Has vuelto de la pausa', {
            icon: 'success',
          });
          localStorage.removeItem('pausa');
          this.hayPausa = false;
         },
         ( err: any) => {
           this._errorService.mostrarMensajeError(err.error.mensaje);
        }
       );
    }else{
      return;
    }


  }
/**
 * Registra una salida
 */
  salida(){
    let marcado: Marcado ;
    
    if (!localStorage.getItem('marcado')) {
      return;
    }

    // leemos la fecha y la hora del reloj
    const fecha = this._relojService.vr.fecha;
    const hora =
      this._relojService.hours + ':' + this._relojService.vr.minutos + ':00';
    // obtener geolocalizacion
    this.geolocalizar();
    // obtenemos el marcado de pausa del localStorage
    if (localStorage.getItem('marcado')){
       marcado = JSON.parse(localStorage.getItem('marcado'));
         // actualiza el marcado
       marcado.horaFinal = hora;
       this._marcadoService.actualizaMarcado(marcado).subscribe(
         (resp: any) => {
          swal('Has registrado la salida', {
            icon: 'success',
          });
          localStorage.removeItem('marcado');
          this.hayMarcado = false;
         },
         ( err: any) => {
           this._errorService.mostrarMensajeError(err.error.mensaje);
        }
       );
    }else{
      return;
    }

  }
}
