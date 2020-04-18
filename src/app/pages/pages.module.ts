import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { AdminComponent } from './admin/admin.component';
import { EmpresasComponent } from './empresas/empresas.component';



@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    AdminComponent,
    EmpresasComponent
  ],
  exports:[
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PAGES_ROUTES
  ]
})
export class PagesModule { }
