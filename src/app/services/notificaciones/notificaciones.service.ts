import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Notificacion } from '../../models/notificacion.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
 rutaPadre: string;
  token = localStorage.getItem('token');
 datosMarcadoNotificar: any;
 idEmpleadoNotificar: any;
  constructor(public _http: HttpClient) { }

  /**
   * Obtiene las notificaciones de un empleado en concreto
   * @param id  id del empleado
   * @param pagina
   */
  obtenerNotificaciones(id: string, pagina: string){

    const url = URL_SERVICIOS + 'notificaciones/empleado/' + id + '?token=' + this.token + '&pagina=' + pagina;

    return this._http.get(url);

  }
  obtenerNotificacionesEnviadas(login: string, pagina: string){
    const url = URL_SERVICIOS + 'notificaciones?token=' + this.token +  '&pagina=' + pagina;

    return this._http.get(url).pipe(
     
      map( (resp: any) => {
        const notificaciones: any[] = [];
        console.log(resp);
        resp.notificaciones.forEach(notificacion => {
          if (notificacion.loginEmisor === login){
            notificaciones.push(notificacion);
          }

        });
        const salida = {paginacion: { registros: notificaciones.length, paginas: Math.ceil(notificaciones.length / 10)},
          notificaciones};
        console.log(salida);
        return  salida;
      })
    );
  }
  obtenerNotificacion(id: string){
    const url = URL_SERVICIOS + 'notificaciones/notificacion/' + id + '?token=' + this.token;

    return this._http.get(url);
  }

  actualizarNotificacion(notificacion: any){
    const url = URL_SERVICIOS + 'notificaciones/update?token=' + this.token;

    return this._http.put(url, notificacion);
  }

  public crearNotificacion(notificacion: any){
    const url = URL_SERVICIOS + 'notificaciones/create?token=' + this.token;
    return this._http.post(url, notificacion);
  }

  public borrarNotificacion(id: string){
    const url = URL_SERVICIOS + 'notificaciones/delete/' + id + '?token=' + this.token;
    return this._http.delete(url);
  }
}
