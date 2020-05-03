import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

/**
 * Controla el acceso a las rutas
 */
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private _usuarioService: UsuarioService){}

  canActivate()
     {
        if (this._usuarioService.usuario.roles.find(rol => rol.rol === 'ADMIN_ROL')){
         
          return true;
        }else{
         
          return false;
        }
    
  }
  
}
