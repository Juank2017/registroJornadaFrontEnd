import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from './service.index';
import { UsuarioService } from './usuario/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuard } from './guards/login.guard';
import { NavbarService } from './navbar/navbar.service';
import { RouterModule } from '@angular/router';
import { EmpresasService } from './empresas/empresas.service';
import { SedesService } from './sedes/sedes.service';
import { AdminGuard } from './guards/admin.guard';
import { MapService } from './map/map.service';
import { EmpleadosService } from './empleados/empleados.service';



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
    AdminGuard,
    NavbarService,
    EmpresasService,
    SedesService,
    MapService,
    EmpleadosService
  ]
})
export class ServiceModule { }
