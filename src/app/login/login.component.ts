import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar/navbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  recuerdame: boolean = false;
  login: string;
  roles: string;

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
        console.log(resp);
        if (resp.mensaje === 'true') {
          this.roles = JSON.stringify(resp.usuario.roles);
          this._navbarService.resetNavBar();
          if (this.roles.indexOf('ADMIN_ROL') !== -1) {
            console.log('redirige a admin');
            this._navbarService.cambiaMenu('admin');
            this.router.navigate(['/empresas']);
          } else {
            console.log('redirige a dashboard');
            console.log('antes cambia user', this._navbarService.user);
            this._navbarService.cambiaMenu('user');
            console.log('cambia user', this._navbarService.user);
            if (this.roles.indexOf('MANAGER_ROL') !== -1) {
              this._navbarService.cambiaMenu('manager');
            }

            this.router.navigate(['/dashboard']);
          }
        }
      });
  }
}
