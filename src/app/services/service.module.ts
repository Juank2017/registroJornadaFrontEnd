import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from './service.index';
import { UsuarioService } from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuard } from './guards/login.guard';
import { NavbarService } from './service.index';
import { RouterModule } from '@angular/router';
import { EmpresasService } from './service.index';
import { SedesService } from './service.index';
import { AdminGuard } from './guards/admin.guard';
import { MapService } from './service.index';
import { EmpleadosService } from './service.index';
import { ErrorService } from './service.index';
import { RelojService } from './service.index';



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
    EmpleadosService,
    ErrorService,
    RelojService
  ]
})
export class ServiceModule { }
