import { Component, OnInit } from '@angular/core';
import { EmpresasService } from '../../services/empresas/empresas.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styles: [
  ]
})
export class EmpresasComponent implements OnInit {
 paginacion:any;
 empresas: any;
  constructor(public _empresasService: EmpresasService) { 
    this._empresasService.getEmpresas()
      .subscribe((resp: any) => {
        console.log(resp)
        this.empresas = resp.empresas;
        this.paginacion = resp.paginacion;
        console.log(this.empresas);
      });
  }

  ngOnInit(): void {
  }

}
