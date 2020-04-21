import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { Empresa } from 'src/app/models/empresa.model';
import { Empleado } from 'src/app/models/empleado.model';
import swal from 'sweetalert';
import { Sede } from 'src/app/models/sede.model';
import { Turno } from 'src/app/models/turno.model';
import { Usuario } from 'src/app/models/usuario.model';

/**
 * Servicio para el CRUD de empleados en el backend
 */
@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  // token recuperado del localStorage
  token: string = localStorage.getItem('token');

  constructor(public _http: HttpClient) {}

  /**
   * obtiene las empleados desde el BackEnd
   * @param pagina
   */
  getEmpleados(pagina: number ) {
    const url = URL_SERVICIOS + 'empleados';

    // parámetros para enviar en la url.
    const params = new HttpParams()
      .set('pagina', pagina.toString())
      .set('token', this.token);

    return this._http.get(url, { params });
  }

  /**
   * Obtiene una empleado por el id
   * @param id
   */
  getEmpleado(id: string){

    const url = URL_SERVICIOS + 'empleados/empleado/' + id + '?token=' + this.token;

    return this._http.get(url).pipe(map((resp: any) => {
      const sede: Sede = resp.sede;
      const turno: Turno = resp.turno;
      const usuario: Usuario = resp.usuario;
     
      const empleado: Empleado = new Empleado(resp.id, resp.nombre, resp.apellidos, resp.dni, usuario, turno, sede);
      return empleado;
    }));
  }

  getEmpleadosEmpresa(id: string, pagina: number){
    const url = URL_SERVICIOS + 'empleados/empresa/' + id + '?token=' + this.token + '&pagina=' + pagina.toString();

    return this._http.get(url);
  }

/**
 * Crea una empleado
 * @param empleado
 */
  createEmpleado(empleado: Empleado){

    const url = URL_SERVICIOS + 'empleados/create?token=' + this.token;

    return this._http.post(url, empleado).pipe(
      map( (resp: any) => {
        swal('La empleado se ha creado', {
          icon: 'success',
        });
        return true;
      }));
  }
  /**
   * Actualiza una empleado
   * @param empleado
   */
  updateEmpleado(empleado: Empleado){
    const url = URL_SERVICIOS + 'empleados/update?token=' + this.token;

    return this._http.put(url, empleado).pipe(
      map( (resp: any) => {
        swal('El empleado ' + resp.nombre + ' se ha actualizaco', {
          icon: 'success',
        });
        return true;
      }));
  }
  /**
   * Borra una empleado
   * @param empleado 
   */
  deleteEmpleado(empleado: Empleado){

    const url = URL_SERVICIOS + 'empleados/delete/' + empleado.id + '?token=' + this.token;

    return this._http.delete(url)
      .pipe(
        map( (resp: any) => {
          swal('La empleado se ha eliminado', {
            icon: 'success',
          });
          return true;
        }));
  }
}
