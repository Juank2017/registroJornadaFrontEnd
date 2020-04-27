import { Component, OnInit } from '@angular/core';
import { Notificacion } from '../../models/notificacion.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificacionesService } from '../../services/notificaciones/notificaciones.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styles: [
  ]
})
export class NotificacionComponent implements OnInit {
  idEmpleado = localStorage.getItem('idEmpleado') ? localStorage.getItem('idEmpleado') : '';
  usuario: Usuario = JSON.parse(localStorage.getItem('usuario'));

  loginEmisor  =  this.usuario.login;

  notificacion: Notificacion = new Notificacion('', null, '', '', '', '', '');
  esNuevo: boolean;
  
  constructor(public activatedRoute: ActivatedRoute,
              public _notificacionesService: NotificacionesService,
              public router: Router) { }

  ngOnInit(): void {
    // se reciben los parametros, si no es nuevo se carga el empleado, si no en blanco
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      if (id !== 'nuevo') {
        this.cargarNotificacion(id);
        // this.cargarHorario();
      } else {
        this.esNuevo = true;
      }
    });
  }
  cargarNotificacion(id: any) {
    this._notificacionesService.obtenerNotificacion(id)
      .subscribe(
         (resp: any) => {
          const fecha: Date = new Date(resp.fecha);
          resp.fecha = fecha.toLocaleDateString('es-ES');
          this.notificacion = resp;

         }
      );
  }

  procesar(f){
console.log(f.value);

if (f.value.id === ''){
      // es una notificacion nueva
    }else{
      // actualizar
      const fechaFormulario = f.value.fecha.split('/');
      
      let fecha: Date = new Date(fechaFormulario[2], fechaFormulario[1], fechaFormulario[0]);
      console.log(fecha.toLocaleString('en-CA', {year: 'numeric' , month: 'numeric', day: '2-digit' }).replace('/', '-').replace('/', '-'));
      const notificacion = {id: f.value.id,
                            fecha: fecha.toLocaleString('en-CA', {year: 'numeric' , month: 'numeric', day: '2-digit' }).replace('/', '-').replace('/', '-'),
                            texto_notificacion:  f.value.texto_notificacion,
                            texto_respuesta: f.value.texto_respuesta,
                            leida: '1',
                            idEMPLEADO: this.idEmpleado,
                            loginEmisor: this.loginEmisor };
      this._notificacionesService.actualizarNotificacion(notificacion)
        .subscribe( (resp: any) => {
          this.router.navigate(['/notificaciones'])
          console.log(resp);
        });
    }
  }
}
