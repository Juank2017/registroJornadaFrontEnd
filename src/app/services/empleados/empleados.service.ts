import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { Empleado } from 'src/app/models/empleado.model';
import swal from 'sweetalert';
import { forkJoin } from 'rxjs';

/**
 * Servicio para el CRUD de empleados en el backend
 */
@Injectable({
  providedIn: 'root',
})
export class EmpleadosService {
  // token recuperado del localStorage
  token: string = localStorage.getItem('token');

  constructor(public _http: HttpClient) {}

  /**
   * obtiene las empleados desde el BackEnd
   * @param pagina
   */
  getEmpleados(pagina: number) {
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
  getEmpleado(id: string) {
    const url =
      URL_SERVICIOS + 'empleados/empleado/' + id + '?token=' + this.token;

    return this._http.get(url);
  }
  /**
   * Obtiene los empleados de una empresa
   * @param id
   * @param pagina
   */
  getEmpleadosEmpresa(id: string, pagina: number) {
    const url =
      URL_SERVICIOS +
      'empleados/empresa/' +
      id +
      '?token=' +
      this.token +
      '&pagina=' +
      pagina.toString();

    return this._http.get(url);
  }
  /**
   * Obtiene un empleado por el login
   * @param login
   */
  getEmpleadoByLogin(login: string) {
    const url =
      URL_SERVICIOS + 'empleados/findByLogin/' + login + '?token=' + this.token;
    return this._http.get(url);
  }
  /**
   * Crea una empleado
   * @param empleado
   */
  createEmpleado(empleado: Empleado) {
    const url = URL_SERVICIOS + 'empleados/create?token=' + this.token;

    return this._http.post(url, empleado).pipe(
      map((resp: any) => {
        swal('El empleado se ha creado', {
          icon: 'success',
        });
        return resp;
      })
    );
  }
  /**
   * Actualiza una empleado
   * @param empleado
   */
  updateEmpleado(empleado: Empleado) {
    const url = URL_SERVICIOS + 'empleados/update?token=' + this.token;
    const urlUsers = URL_SERVICIOS + 'usuarios/update?token=' + this.token;
    const obserUsuario = this._http.put(urlUsers, empleado.usuario).pipe(
      map((resp: any) => {
        swal('El usuario ' + resp.login + ' se ha actualizaco', {
          icon: 'success',
        });
        return true;
      })
    );
    const obserEmpleado = this._http.put(url, empleado).pipe(
      map((resp: any) => {
        console.log(resp);
        swal('El empleado ' + resp.nombre + ' se ha actualizado', {
          icon: 'success',
        });
        return true;
      })
    );
    return forkJoin([obserUsuario, obserEmpleado]);
  }
  /**
   * Borra una empleado
   * @param empleado
   */
  deleteEmpleado(empleado: Empleado) {
    const url =
      URL_SERVICIOS +
      'empleados/delete/' +
      empleado.id +
      '?token=' +
      this.token;

    return this._http.delete(url).pipe(
      map(() => {
        swal('El empleado se ha eliminado', {
          icon: 'success',
        });
        return true;
      })
    );
  }
}
