import { Component, OnInit } from '@angular/core';
import { Rol } from '../../models/rol.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  usuario: any = localStorage.getItem('usuario');
  
  constructor(public router: Router) {

    if (this.usuario.indexOf('ADMIN_ROL') === -1){
      this.router.navigate(['/marcado']);
    }else{
      this.router.navigate(['/empresas']);
    }
  
  
  }


  ngOnInit(): void {
  

}
}
