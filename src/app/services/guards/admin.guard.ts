import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private _usuarioService: UsuarioService){}

  canActivate()
     {
        if (this._usuarioService.usuario.roles.find(rol => rol.rol === 'ADMIN_ROL')){
          console.log("es admin");
          return true;
        }else{
          console.log('no es admin');
          return false;
        }
    
  }
  
}
