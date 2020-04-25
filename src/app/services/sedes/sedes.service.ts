import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Sede } from 'src/app/models/sede.model';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Empresa } from 'src/app/models/empresa.model';
/**
 * Servicio para el CRUD de sedes en el backend
 */
@Injectable({
  providedIn: 'root'
})
export class SedesService {
  empresaSeleccionada: string;
  // token recuperado del localStorage
  token: string = localStorage.getItem('token');

  constructor(public _http: HttpClient) {}

  /**
   * obtiene las sedes desde el BackEnd
   * @param pagina
   */
  getSedes(pagina: number ) {
    const url = URL_SERVICIOS + 'sedes';

    // parámetros para enviar en la url.
    const params = new HttpParams()
      .set('pagina', pagina.toString())
      .set('token', this.token);

    return this._http.get(url, { params });
  }

  /**
   * Obtiene una sede por el id
   * @param id
   */
  getSede(id: string){

    const url = URL_SERVICIOS + 'sedes/sede/' + id + '?token=' + this.token;

    return this._http.get(url).pipe(map((resp: any) => {

      const empresa: Empresa = new Empresa(resp.sede.empresa.id, resp.sede.empresa.nombre, resp.sede.empresa.cif);
      const sede: Sede = new Sede(resp.sede.id, resp.sede.nombre, resp.sede.direccion, resp.sede.longitud, resp.sede.latitud, empresa);
      return sede;
    }));
  }

  getSedeByEmpresaId(idEmpresa: string){
    const url = URL_SERVICIOS + 'sedes/empresa/' + idEmpresa + '?token=' + this.token;
    return this._http.get(url);
  }
/**
 * Crea una sede
 * @param sede
 */
  createSede(sede: Sede){

    const url = URL_SERVICIOS + 'sedes/create?token=' + this.token;

    return this._http.post(url, sede).pipe(
      map( (resp: any) => {
        swal('La sede se ha creado', {
          icon: 'success',
        });
        return true;
      }));
  }
  /**
   * Actualiza una sede
   * @param sede
   */
  updateSede(sede: Sede){
    const url = URL_SERVICIOS + 'sedes/update?token=' + this.token;

    return this._http.put(url, sede).pipe(
      map( (resp: any) => {
        swal('La sede ' + resp.nombre + ' se ha actualizaco', {
          icon: 'success',
        });
        return true;
      }));
  }
  /**
   * Borra una sede
   * @param sede 
   */
  deleteSede(sede: Sede){

    const url = URL_SERVICIOS + 'sedes/delete/' + sede.id + '?token=' + this.token;

    return this._http.delete(url)
      .pipe(
        map( (resp: any) => {
          swal('La sede se ha eliminado', {
            icon: 'success',
          });
          return true;
        }));
  }
}
