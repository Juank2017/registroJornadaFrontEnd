import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class MarcajesService {

  token = localStorage.getItem('token');

  constructor(public _http: HttpClient) { }

  obtenerMarcajes(idEmpleado: string, pagina:string){
    const url = URL_SERVICIOS + 'marcados/empleado/' + idEmpleado + '?token=' + this.token + '&pagina=' + pagina;

    return this._http.get(url);
  }
}
