import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Rutas
import { APP_ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';

import { HeaderComponent } from './shared/header/header.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { PagesComponent } from './pages/pages.component';


// servicios
import { ServiceModule } from './services/service.module';


// modulos
import { PagesModule } from './pages/pages.module';

import {ReactiveFormsModule,  FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    PagesModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    APP_ROUTES
  ],
  providers: [ServiceModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
