import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  menuAdmin: any = [
    {
      titulo: 'Administración',
      icono: 'fas fa-user-tie',
      subMenu: [
        { titulo: 'Empresas', url: '/empresas' },
        { titulo: 'Sedes', url: '/sedes' },
        { titulo: 'Empleados', url: '/empleados' },
      ],
    },
  ];
  menuMarcado: any = [
    {
      titulo: 'Marcado',
      icono: 'fas fa-user-clock',
      subMenu: [
        { titulo: 'Marcado', url: '/marcado' },
        { titulo: 'Mis marcajes', url: '/mismarcajes' },
        { titulo: 'Notificaciones', url: '/notificaciones' },
      ],
    },
  ];
  menuManager: any = [
    {
      titulo: 'Manager',
      icono: 'fas fa-user-cog',
      subMenu: [
        { titulo: 'Informes marcado', url: '/informes' },
        { titulo: 'Notificaciones', url: '/notificaciones' },
      ],
    },
  ];
  admin: boolean = false;
  user: boolean = false;
  manager: boolean = false;

  constructor() {}
  /**
   * Configura la barra de navegación
   */
  setNavbar() {
    switch (localStorage.getItem('rol')) {
      case 'ADMIN':
        this.admin = true;
        break;
      case 'USER':
        this.user = true;
        break;
      case 'MANAGER':
        this.user = true;
        this.manager = true;
        
        break;
    }
  }
  /**Resetea la barra de navegación
   *
   */
  resetNavBar() {
    this.admin = false;
    this.manager = false;
    this.user = false;
  }

  /**
   * Cambia el menú dependiendo del tipo de usuairo
   * @param menu
   */
  cambiaMenu(menu: string) {
    switch (menu) {
      case 'admin':
        this.admin = !this.admin;
        break;
      case 'user':
        this.user = !this.user;
        break;
      case 'manager':
        this.manager = !this.manager;
        break;
    }
  }
}
