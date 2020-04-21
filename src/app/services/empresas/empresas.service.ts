import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Empresa } from 'src/app/models/empresa.model';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root',
})
export class EmpresasService {
 // pagina: string = '1';
  token: string = localStorage.getItem('token');
  constructor(public _http: HttpClient) {}

  getEmpresas(pagina: number ) {
    let url = URL_SERVICIOS + 'empresas';

    const params = new HttpParams()
      .set('page', pagina.toString())
      .set('token', this.token);

    return this._http.get(url, { params });
  }

  createEmpresa(empresa: Empresa){
    let url = URL_SERVICIOS + 'empresas/create?token=' + this.token;
    return this._http.post(url, empresa);
  }
  updateEmpresa(empresa: Empresa){
    let url = URL_SERVICIOS + 'empresas/update?token=' + this.token;

    return this._http.put(url, empresa);
  }
  deleteEmpresa(empresa: Empresa){
    const url = URL_SERVICIOS + 'empresas/delete/' + empresa.id + '?token=' + this.token;

    return this._http.delete(url)
      .pipe(
        map( (resp: any) => {
          swal('La empresa se ha eliminado', {
            icon: 'success',
          });
          return true;
        }));
  }
}
