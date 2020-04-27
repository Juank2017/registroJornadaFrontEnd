import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { AdminComponent } from './admin/admin.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { MarcadoComponent } from './marcado/marcado.component';
import { ModalComponent } from './modal/modal.component';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SedesComponent } from './sedes/sedes.component';
import { SedeComponent } from './sedes/sede.component';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapComponent } from '../components/map/map.component';
import { EmpleadosComponent } from './empleados/empleados/empleados.component';
import { EmpleadoComponent } from './empleados/empleados/empleado.component';
import { RelojComponent } from '../components/reloj/reloj.component';
import { RelojService } from '../services/reloj/reloj.service';
import { MarcajesComponent } from './marcajes/marcajes.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { NotificacionComponent } from './notificaciones/notificacion.component';
import { InformesComponent } from './informes/informes.component';



@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    AdminComponent,
    EmpresasComponent,
    MarcadoComponent,
    ModalComponent,
    SedesComponent,
    SedeComponent,
    MapComponent,
    EmpleadosComponent,
    EmpleadoComponent,
    RelojComponent,
    MarcajesComponent,
    NotificacionesComponent,
    NotificacionComponent,
    InformesComponent
    
  ],
  providers:[
    RelojService
  ],
  exports:[
    DashboardComponent
  ],
  imports: [
    
    CommonModule,
    LeafletModule,
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ReactiveFormsModule,
   
  ]
})
export class PagesModule { }
