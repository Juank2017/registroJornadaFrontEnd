import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  token = localStorage.getItem('token');
  constructor(public _http: HttpClient) { }


  obtenerTurnos(){

    const url = URL_SERVICIOS + 'turnos?token=' + this.token;

    return this._http.get(url);
  }
}
