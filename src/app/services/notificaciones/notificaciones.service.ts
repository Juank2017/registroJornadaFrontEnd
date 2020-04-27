import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Notificacion } from '../../models/notificacion.model';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  token = localStorage.getItem('token');

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

  obtenerNotificacion(id: string){
    const url = URL_SERVICIOS + 'notificaciones/notificacion/' + id + '?token=' + this.token;

    return this._http.get(url);
  }

  actualizarNotificacion(notificacion: any){
    const url = URL_SERVICIOS + 'notificaciones/update?token=' + this.token;

    return this._http.put(url, notificacion);
  }
}
