import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { AdminGuard } from './guards/admin.guard';

import { SharedService } from './service.index';
import { UsuarioService } from './service.index';
import { NavbarService } from './service.index';
import { EmpresasService } from './service.index';
import { SedesService } from './service.index';
import { MapService } from './service.index';
import { EmpleadosService } from './service.index';
import { ErrorService } from './service.index';
import { RelojService } from './service.index';
import { MarcajesService } from './service.index';
import { NotificacionesService } from './service.index';
import { InformesService } from './informes/informes.service';



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
    RelojService,
    MarcajesService,
    NotificacionesService,
    InformesService
  
  ]
})
export class ServiceModule { }
