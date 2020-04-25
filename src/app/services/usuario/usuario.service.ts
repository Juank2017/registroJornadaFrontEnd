import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from 'src/app/models/usuario.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import swal from 'sweetalert';


@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  usuario: Usuario;
  token: string;

  constructor(public _http: HttpClient, public router: Router) {
    this.cargarStrorage();
  }

  logout(){
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('rol');
    localStorage.removeItem('id');
    this.router.navigate(['/login']);
  }

  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem('login', usuario.login);
    } else {
      localStorage.removeItem('login');
    }
    let url = `${URL_SERVICIOS}login`;

    return this._http.post(url, usuario).pipe(
      map((resp: any) => {
        localStorage.setItem('id', resp.usuario.id);
        localStorage.setItem('token', resp.token);
        localStorage.setItem('usuario', JSON.stringify(resp.usuario));
        this.usuario = resp.usuario;
        this.token = resp.token;
        return resp;
      })
    );
  }

  createUser(usuario: Usuario){
    const url = URL_SERVICIOS + 'usuarios/create?token=' + this.token;
    return this._http.post(url, usuario).pipe(
      map( (resp: any) => {
        swal('El empleado se ha creado', {
          icon: 'success',
        });
        return resp;
      }));
  }

  getRoles(){
    const url = URL_SERVICIOS + 'roles?token=' + this.token;
    return this._http.get(url);  
  }

  cargarStrorage(){
    if (localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }else{
      this.token = '';
      this.usuario = null;
    }
  }
  estaLogado() {
    return this.token.length > 5 ? true : false;
  }
}
