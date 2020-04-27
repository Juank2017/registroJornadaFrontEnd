import { Component, OnInit } from '@angular/core';
import { NotificacionesService } from '../../services/notificaciones/notificaciones.service';
import { Notificacion } from '../../models/notificacion.model';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styles: [
  ]
})
export class NotificacionesComponent implements OnInit {

  idEmpleado = localStorage.getItem('idEmpleado') ? localStorage.getItem('idEmpleado') : '';
  notificaciones: Notificacion[] = [];
  paginaActual = 1;
  paginasTotales: number;
  paginacion: any;

  
  constructor(public _notificacionesService: NotificacionesService) { }


  ngOnInit(): void {
    this.obtenerNotificaciones();
  }

  obtenerNotificaciones(){
    this._notificacionesService.obtenerNotificaciones(this.idEmpleado, this.paginaActual.toString())
      .subscribe( (resp: any) => {
        this.paginacion = resp.paginacion;
        this.paginasTotales = resp.paginacion.paginas;
        this.notificaciones = resp.notificaciones;
      });
  }


  cambiarPagina(pagina: any){

  }

}
