import { Component, OnInit } from '@angular/core';
import { NotificacionesService } from '../../services/notificaciones/notificaciones.service';
import { Notificacion } from '../../models/notificacion.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import swal from 'sweetalert';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styles: [
  ]
})
export class NotificacionesComponent implements OnInit {
  esManager: string = localStorage.getItem('rol');
  idEmpleado = localStorage.getItem('idEmpleado') ? localStorage.getItem('idEmpleado') : '';
  usuario: Usuario = JSON.parse(localStorage.getItem('usuario'));
 mio:string;

  loginEmisor  =  this.usuario.login;
  notificaciones: Notificacion[] = [];
  paginaActual = 1;
  paginasTotales: number;
  paginacion: any;
  tipo: any;
  
  constructor(public _notificacionesService: NotificacionesService,
              public router: Router,
              public activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.tipo = params.tipo;
      console.log(this.tipo);
      if (this.tipo === 'recibidas') {
        this.obtenerNotificaciones(this.idEmpleado);
        // this.cargarHorario();
      } else {
        console.log(this.esManager);
        this.obtenerNotificacionesEnviadas(this.loginEmisor);
      }
    });
  }

  obtenerNotificaciones(id: string){
    this._notificacionesService.obtenerNotificaciones(id, this.paginaActual.toString())
      .subscribe( (resp: any) => {
        this.paginacion = resp.paginacion;
        this.paginasTotales = resp.paginacion.paginas;
        this.notificaciones = resp.notificaciones;
        console.log(this.paginacion);
        console.log(this.notificaciones);
      });
  }

  obtenerNotificacionesEnviadas(login: string){
    this._notificacionesService.obtenerNotificacionesEnviadas(login, this.paginaActual.toString())
      .subscribe( (resp: any) => {
        this.paginacion = resp.paginacion;
        this.paginasTotales = resp.paginacion.paginas;
        
        this.notificaciones = resp.notificaciones;
        console.log(this.notificaciones);
      });
  }

  cambiarPagina(valor: any){
    if (this.paginaActual + valor > this.paginasTotales) {
      return;
    }
    if (this.paginaActual + valor < 0) {
      return;
    }
    this.paginaActual = this.paginaActual + valor;
    if (this.tipo === 'recibidas'){
      this.obtenerNotificaciones(this.idEmpleado);
    }else {
      this.obtenerNotificacionesEnviadas(this.loginEmisor);
    }
   
  }

  responder(id: string){
    this._notificacionesService.rutaPadre = '/notificaciones/' + this.tipo;
    this.router.navigate(['notificacion' , id ]);
  }

  borrar(id: string){
    swal({
      title: '¿Está seguro?',
      text: 'Está a punto de eliminar la notificación ',
      icon: 'warning',
      buttons: ['Cancelar', 'Aceptar'],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this._notificacionesService.borrarNotificacion(id).subscribe((borrado) => {
          this.obtenerNotificacionesEnviadas(this.loginEmisor);
        });
      }
    });
    
  }
}
