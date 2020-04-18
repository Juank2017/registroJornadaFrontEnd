import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmpresasService {
  pagina: string;
  token: string = localStorage.getItem('token');
  constructor(public _http: HttpClient) {}

  getEmpresas() {
    let url = URL_SERVICIOS + 'empresas';

    const params = new HttpParams()
      .set('page', this.pagina)
      .set('token', this.token);

    return this._http.get(url, { params });
  }
}
