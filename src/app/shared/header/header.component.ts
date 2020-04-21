import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { NavbarService } from '../../services/navbar/navbar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
 

  constructor(public _usuarioService: UsuarioService, public _navbarService: NavbarService) {
    
   this._navbarService.setNavbar();
  }

  ngOnInit(): void {}


}
