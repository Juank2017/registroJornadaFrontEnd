import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { LoginGuard } from '../services/guards/login.guard';
import { EmpresasComponent } from './empresas/empresas.component';
import { MarcadoComponent } from './marcado/marcado.component';
import { SedesComponent } from './sedes/sedes.component';
import { AdminGuard } from '../services/guards/admin.guard';
import { SedeComponent } from './sedes/sede.component';
import { EmpleadosComponent } from './empleados/empleados/empleados.component';
import { EmpleadoComponent } from './empleados/empleados/empleado.component';



const pagesRoutes: Routes = [
    { 
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuard],
        children:[
            { path: 'dashboard', component: DashboardComponent},
            { path: 'empresas', component: EmpresasComponent, canActivate: [AdminGuard], data: {titulo: 'Empresas'}},
            { path: 'sedes', component: SedesComponent, canActivate: [ AdminGuard], data: {titulo: 'Sedes'}},
            { path: 'sede/:id', component: SedeComponent, canActivate: [AdminGuard], data: {titulo: 'Manteminiemto de Sede'}},
            { path: 'empleados', component: EmpleadosComponent, canActivate: [ AdminGuard], data: {titulo: 'Empleados'}},
            { path: 'empleado/:id', component: EmpleadoComponent, canActivate: [AdminGuard], data: {titulo: 'Manteminiemto de Empleado'}},
            { path: 'marcado', component: MarcadoComponent, data: {titulo: 'Marcado'}},
            { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
        ]
    }
];
export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes);
