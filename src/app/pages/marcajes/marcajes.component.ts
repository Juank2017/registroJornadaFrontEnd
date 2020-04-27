import { Component, OnInit } from '@angular/core';
import { Marcado } from '../../models/marcado.model';
import { MarcajesService } from '../../services/marcajes/marcajes.service';

@Component({
  selector: 'app-marcajes',
  templateUrl: './marcajes.component.html',
  styles: [],
})
export class MarcajesComponent implements OnInit {
  paginacion: any;
 

  paginaActual = 1;
  paginasTotales: number;
 
  marcajes: any[] = [];
  idEmpleado = localStorage.getItem('idEmpleado') ? localStorage.getItem('idEmpleado') : '';
  constructor(public _marcajesService: MarcajesService) { }

  ngOnInit(): void {
   this.obtenerMarcados();
  }
/**
   * acción de los botones siguiente y anterior
   * @param valor
   */
  cambiarPagina(valor: number) {
    if (this.paginaActual + valor > this.paginasTotales) {
      return;
    }
    if (this.paginaActual + valor < 0) {
      return;
    }
    this.paginaActual = this.paginaActual + valor;
    this.obtenerMarcados();
  }

obtenerMarcados(){
  console.log(this.paginaActual,this.paginasTotales);
  this._marcajesService.obtenerMarcajes(this.idEmpleado, this.paginaActual.toString())
  .subscribe( (resp: any) =>{
    console.log(resp);
    this.marcajes = resp.marcados;
    this.paginacion = resp.paginacion;
    this.paginasTotales = resp.paginacion.paginas;
    console.log(this.marcajes);
  });
}

}