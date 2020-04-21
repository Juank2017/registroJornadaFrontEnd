import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar/navbar.service';
import { Rol } from '../models/rol.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  recuerdame: boolean = false;
  login: string;
  roles: Rol[];

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router,
    public _navbarService: NavbarService
  ) {}

  ngOnInit(): void {
    this.login = localStorage.getItem('login') || '';
    console.log(this.login);
    if (this.login.length > 1) {
      this.recuerdame = true;
    }
  }
  acceder(forma: NgForm) {
    if (forma.invalid) {
      return;
    }
    let usuario: Usuario = new Usuario(
      null,
      forma.value.login,
      forma.value.password,
      null,
      null
    );
    this._usuarioService
      .login(usuario, forma.value.recuerdame)
      .subscribe((resp: any) => {
        // cuando recibe la respuesta correcta, guarda en localStorage el rol del usuario
        // y redirige al usuario a la página de entrada según el rol
        // resetea el menu del navbar para que se actualice según el valor que se le asigne a rol en el localStorage.
        if (resp.mensaje === 'true') {

          this._navbarService.resetNavBar();

          this.roles = resp.usuario.roles;
                
          if (this.roles.find(rol => (rol.rol === 'ADMIN_ROL'))) {
        
            localStorage.setItem('rol', 'ADMIN');
            this.router.navigate(['/empresas']);
        
          } else {
            
            this._navbarService.cambiaMenu('user');
            localStorage.setItem('rol','USER');
            if (this.roles.find(rol => (rol.rol === 'MANAGER_ROL'))) {
              localStorage.setItem('rol','MANAGER');
        
            }
            this.router.navigate(['/marcado']);

          }
        }
      });
  }
}
