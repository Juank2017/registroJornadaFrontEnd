import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from './service.index';
import { UsuarioService } from './usuario/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuard } from './guards/login.guard';
import { NavbarService } from './navbar/navbar.service';
import { RouterModule } from '@angular/router';
import { EmpresasService } from './empresas/empresas.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  providers:[
    SharedService,
    UsuarioService,
    LoginGuard,
    NavbarService,
    EmpresasService
  ]
})
export class ServiceModule { }
