import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(public _usuarioService: UsuarioService, public router: Router){

  }
  canActivate( ): boolean  {
    if (this._usuarioService.estaLogado()){
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
   
  }
  
}
