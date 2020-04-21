import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor(public router: Router) {
    // si se cierra el navagaodr y se vuelve a abrir con esta comprobación redirigimos
    // al usuario, si está logado previamente, a la pantalla que le correponda según sea admin o no
    // if (localStorage.getItem('rol') === 'ADMIN'){
    //   this.router.navigate(['/empresas']);
    // }else{
    //   this.router.navigate(['/marcado']);
    // }
   }

  ngOnInit(): void {
  }

}
