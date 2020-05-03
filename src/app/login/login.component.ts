import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar/navbar.service';
import { Rol } from '../models/rol.model';
import { ErrorService } from '../services/errors/error.service';
/**
 * Componente para el login en la web
 */
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
    public _navbarService: NavbarService,
    public _errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.login = localStorage.getItem('login') || '';
    if (this.login.length > 1) {
      this.recuerdame = true;
    }
  }
  /**
   * Recibe los datos del formulario y lo gestiona
   * @param forma
   */
  acceder(forma: NgForm) {
    if (forma.invalid) {
      return;
    }
    const usuario: Usuario = new Usuario(
      null,
      forma.value.login,
      forma.value.password,
      null,
      null
    );
    // llama el servicio de usuarios para realizar el login
    this._usuarioService
      .login(usuario, forma.value.recuerdame)
      .subscribe((resp: any) => {
        // cuando recibe la respuesta correcta, guarda en localStorage el rol del usuario
        // y redirige al usuario a la página de entrada según el rol
        // resetea el menu del navbar para que se actualice según el valor que se le asigne a rol en el localStorage.
        if (resp.mensaje === 'true') {
          this._navbarService.resetNavBar();

          this.roles = resp.usuario.roles;

          if (this.roles.find((rol) => rol.rol === 'ADMIN_ROL')) {
            localStorage.setItem('rol', 'ADMIN');
            this.router.navigate(['/empresas']);
          } else {
            this._navbarService.cambiaMenu('user');
            localStorage.setItem('rol', 'USER');
            if (this.roles.find((rol) => rol.rol === 'MANAGER_ROL')) {
              localStorage.setItem('rol', 'MANAGER');
            }
            this.router.navigate(['/marcado']);
          }
        }
      },
      (err: any) =>{
        this._errorService.mostrarMensajeError(err.error.mensaje);
      });
  }
}
