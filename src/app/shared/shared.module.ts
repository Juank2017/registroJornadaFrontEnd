import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';



@NgModule({
  declarations: [
    NopagefoundComponent,
    HeaderComponent,
    NavbarComponent,
    BreadcrumbsComponent,
  ],
  exports:[
    NopagefoundComponent,
    HeaderComponent,
    NavbarComponent,
    BreadcrumbsComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
