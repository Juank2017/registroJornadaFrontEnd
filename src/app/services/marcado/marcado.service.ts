import { Injectable } from '@angular/core';
import { Marcado } from '../../models/marcado.model';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { map } from 'rxjs/internal/operators/map';
import swal from 'sweetalert';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';

@Injectable({
  providedIn: 'root',
})
export class MarcadoService {
  token = localStorage.getItem('token');

  constructor(public _http: HttpClient) {}

  /**
   * Crea un marcado
   * @param marcado 
   */
  crearMarcado(marcado: Marcado) {
    const url = URL_SERVICIOS + 'marcados/create?token=' + this.token;

    return this._http.post(url, marcado).pipe(
      map((resp: any) => {
        swal('Entrada registrada', {
          icon: 'success',
        });
        return resp;
      })
    );
  }

  actualizaMarcado(marcado: Marcado){
    const url = URL_SERVICIOS + 'marcados/update?token=' + this.token;

    return this._http.put(url, marcado);
  }

  marcadosEmpleado(id: string, fecha: string) {
    const url =
      URL_SERVICIOS + 'marcados/empleado/' + id + '?token=' + this.token + '&pagina=-1';
    const marcados: Marcado[] = [];
    return this._http.get(url).pipe(
      map((resp: any) => {
       
        resp.marcados.forEach((element) => {
          if (element.fecha === fecha && element.horaFinal === '00:00:00') {
            marcados.push(element);
          }
        });
        return marcados;
      })
    );
  }
}
