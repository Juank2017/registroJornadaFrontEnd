import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Horario } from '../../models/horario.model';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  token = localStorage.getItem('token');
  constructor(public _http: HttpClient) { }
  
  getHorarioByEmpleadoId(id: string){
    const url = URL_SERVICIOS + 'horarios/empleado/' + id + '?token=' + this.token;
    return this._http.get(url);
  }

   public crearHorario(horario: Horario){
    const url = URL_SERVICIOS + 'horarios/create?token=' + this.token;
    return this._http.post(url, horario);
  }

  public borrarHorario(id: string){
    const url = URL_SERVICIOS + 'horarios/delete/' + id + '?token=' + this.token;
    return this._http.delete(url); 
  }
  public actualizarHorario(horario: Horario){
    const url = URL_SERVICIOS + 'horarios/update?token=' + this.token;
    
    return this._http.put(url, horario);
    
  }
}
