import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { LoginGuard } from '../services/guards/login.guard';
import { EmpresasComponent } from './empresas/empresas.component';



const pagesRoutes: Routes = [
    { 
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuard],
        children:[
            { path: 'dashboard', component: DashboardComponent},
            { path: 'empresas', component: EmpresasComponent},
            { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
        ]
    }
];
export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes);
