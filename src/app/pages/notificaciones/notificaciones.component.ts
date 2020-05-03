import { Component, OnInit } from '@angular/core';
import { NotificacionesService } from '../../services/notificaciones/notificaciones.service';
import { Notificacion } from '../../models/notificacion.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import swal from 'sweetalert';

/**
 * Componente para mostrar las notificaciones
 */
@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styles: [],
})
export class NotificacionesComponent implements OnInit {
  esManager: string = localStorage.getItem('rol');
  idEmpleado = localStorage.getItem('idEmpleado')
    ? localStorage.getItem('idEmpleado')
    : '';
  usuario: Usuario = JSON.parse(localStorage.getItem('usuario'));

  loginEmisor = this.usuario.login;
  notificaciones: Notificacion[] = [];
  paginaActual = 1;
  paginasTotales: number;
  paginacion: any;
  tipo: any;

  constructor(
    public _notificacionesService: NotificacionesService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {}

  /**
   * En el inicio se establece a través del parámetro de la url si
   * debe mostrar notificaciones recibidas (usuario) o enviadas (manager)
   * la url según de donde venga sería notificaciones/recibidas o notificaciones/enviadas
   */
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.tipo = params.tipo;

      if (this.tipo === 'recibidas') {
        this.obtenerNotificaciones(this.idEmpleado);
      } else {
        this.obtenerNotificacionesEnviadas(this.loginEmisor);
      }
    });
  }

  /**
   * Obtiene las notificaciones de un empleado
   * @param id
   */
  obtenerNotificaciones(id: string) {
    this._notificacionesService
      .obtenerNotificaciones(id, this.paginaActual.toString())
      .subscribe((resp: any) => {
        this.paginacion = resp.paginacion;
        this.paginasTotales = resp.paginacion.paginas;
        this.notificaciones = resp.notificaciones;
      });
  }

  /**
   * Obtiene las notificaciones enviadas por un login concreto (emisor)
   */
  obtenerNotificacionesEnviadas(login: string) {
    this._notificacionesService
      .obtenerNotificacionesEnviadas(login, this.paginaActual.toString())
      .subscribe((resp: any) => {
        this.paginacion = resp.paginacion;
        this.paginasTotales = resp.paginacion.paginas;

        this.notificaciones = resp.notificaciones;
      });
  }

  /**
   * gestiona la paginación
   */
  cambiarPagina(valor: any) {
    if (this.paginaActual + valor > this.paginasTotales) {
      return;
    }
    if (this.paginaActual + valor < 0) {
      return;
    }
    this.paginaActual = this.paginaActual + valor;
    if (this.tipo === 'recibidas') {
      this.obtenerNotificaciones(this.idEmpleado);
    } else {
      this.obtenerNotificacionesEnviadas(this.loginEmisor);
    }
  }

  /**
   * Responde al evento click del icono responder, guarda la ruta desde donde se parte
   * para luego poder volver, y redirige al usuario al componente notificación.
   * @param id
   */
  responder(id: string) {
    this._notificacionesService.rutaPadre = '/notificaciones/' + this.tipo;
    this.router.navigate(['notificacion', id]);
  }

  /**
   * Borra una notificación
   * @param id
   */
  borrar(id: string) {
    swal({
      title: '¿Está seguro?',
      text: 'Está a punto de eliminar la notificación ',
      icon: 'warning',
      buttons: ['Cancelar', 'Aceptar'],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this._notificacionesService
          .borrarNotificacion(id)
          .subscribe((borrado) => {
            this.obtenerNotificacionesEnviadas(this.loginEmisor);
          });
      }
    });
  }
}
