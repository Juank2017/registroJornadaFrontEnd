import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { NotificacionesService } from '../../services/notificaciones/notificaciones.service';
import { Usuario } from '../../models/usuario.model';
import { RelojService } from '../../services/reloj/reloj.service';
import swal from 'sweetalert';
import { ErrorService } from '../../services/errors/error.service';
/**
 * Componente para gestionar una notificación
 */
@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styles: [],
})
export class NotificacionComponent implements OnInit {
  idEmpleado = localStorage.getItem('idEmpleado')
    ? localStorage.getItem('idEmpleado')
    : '';
  usuario: Usuario = JSON.parse(localStorage.getItem('usuario'));

  loginEmisor = this.usuario.login;

  notificacion = {
    id: '',
    fecha: '',
    texto_notificacion: '',
    texto_respuesta: '',
    leida: '',
    idEMPLEADO: this.idEmpleado,
    loginEmisor: this.loginEmisor,
  };

  esNuevo: boolean;
  // currentUrl: string;
  // previousUrl: string;

  constructor(
    public activatedRoute: ActivatedRoute,
    public _notificacionesService: NotificacionesService,
    public _relojService: RelojService,
    public _errorSrevice: ErrorService,
    public router: Router
  ) {}

  ngOnInit(): void {
    // se reciben los parametros, si no es nuevo se carga la notificación, si no en blanco
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      if (id !== 'nuevo') {
        this.cargarNotificacion(id);
      } else {
        // es una notificación nueva, rellenamos el campo fecha con la fecha actual
        // en el campo texto ponemos los datos del marcado
        this.esNuevo = true;
        const fecha: Date = new Date();

        this.notificacion.fecha = fecha.toLocaleString('en-CA', {
          year: 'numeric',
          month: 'numeric',
          day: '2-digit',
        });
        this.notificacion.loginEmisor = this.loginEmisor;
        const textoMarcado =
          'Fecha: ' +
          this._notificacionesService.datosMarcadoNotificar.fecha +
          '\nHora Inicio: ' +
          this._notificacionesService.datosMarcadoNotificar.horaInicio +
          '\nHora Fin: ' +
          this._notificacionesService.datosMarcadoNotificar.horaFinal +
          '\nTipo: ' +
          this._notificacionesService.datosMarcadoNotificar.tipo_marcaje
            .tipo_marcaje;
        this.notificacion.texto_notificacion = textoMarcado;
        this.notificacion.texto_respuesta = '.';
        this.notificacion.leida = '0';
        this.notificacion.idEMPLEADO = this._notificacionesService.idEmpleadoNotificar;
      }
    });
  }
  /**
   * Carga una notificación
   * @param id
   */
  cargarNotificacion(id: any) {
    this._notificacionesService
      .obtenerNotificacion(id)
      .subscribe((resp: any) => {
        const fecha: Date = new Date(resp.fecha);
        resp.fecha = fecha.toLocaleDateString('es-ES');
        this.notificacion = resp;
      });
  }

  /**
   * Método que agranda el textarea si necesita más espacio para escribir
   * Responde al evento keyup del textarea.
   * @param e
   */
  autoGrowTextZone(e) {
    e.target.style.height = '0px';
    e.target.style.height = e.target.scrollHeight + 25 + 'px';
  }

  /**
   * Procesa el formulario
   * @param f
   */
  procesar(f) {
    if (f.value.id === '') {
      // es una notificacion nueva
      this._notificacionesService
        .crearNotificacion(this.notificacion)
        .subscribe(
          () => {
            swal({
              title: 'Notificación',
              text: 'Notificación realizada ',
              icon: 'success',
              buttons: [true],
              dangerMode: false,
            });
          },
          (err: any) => {
            this._errorSrevice.mostrarMensajeError(err.error.message);
          }
        );
    } else {
      // actualizar
      const fechaFormulario = f.value.fecha.split('/');

      const fecha: Date = new Date(
        fechaFormulario[2],
        fechaFormulario[1],
        fechaFormulario[0]
      );

      const notificacion = {
        id: f.value.id,
        fecha: fecha
          .toLocaleString('en-CA', {
            year: 'numeric',
            month: 'numeric',
            day: '2-digit',
          })
          .replace('/', '-')
          .replace('/', '-'),
        texto_notificacion: f.value.texto_notificacion,
        texto_respuesta: f.value.texto_respuesta,
        leida: '1',
        idEMPLEADO: this.notificacion.idEMPLEADO,
        loginEmisor: this.notificacion.loginEmisor,
      };
      this._notificacionesService
        .actualizarNotificacion(notificacion)
        .subscribe(
          (resp: any) => {
            swal({
              title: 'Notificación',
              text: 'Notificación actualizada ',
              icon: 'success',
              buttons: ['Aceptar'],
              dangerMode: false,
            });

            this.volver();
          },
          (err: any) => {
            this._errorSrevice.mostrarMensajeError(err.error.message);
          }
        );
    }
  }

  /**
   * Regresa a la ruta por donde haya venido el usuario.
   */
  volver() {
    this.router.navigate([this._notificacionesService.rutaPadre]);
  }
}
