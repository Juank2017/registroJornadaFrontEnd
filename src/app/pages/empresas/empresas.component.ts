import { Component, OnInit } from '@angular/core';
import { EmpresasService } from '../../services/empresas/empresas.service';
import { Empresa } from 'src/app/models/empresa.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import swal from 'sweetalert';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styles: [],
})
export class EmpresasComponent implements OnInit {

  formulario: FormGroup;

  idFilaEditar: any;
  editar: boolean = false;
  paginacion: any;
  empresas: Empresa[] = [];
  empresa: Empresa;
 
  paginaActual: number = 1;
  paginasTotales: number;

  clasePaginacionAnterior: string =
    this.paginaActual < 1 ? 'page-link' : 'page-link disabled';
  clasePaginacionSiguiente: string =
    this.paginaActual > this.paginasTotales
      ? 'page-link'
      : 'page-link disabled';

  constructor(public _empresasService: EmpresasService) {
    this.obtenerEmpresas();
  }
  crearEmpresa(){
    console.log(this.formulario.value);
    const  empresaNueva: Empresa = new Empresa(null, this.formulario.value.nombre, this.formulario.value.cif);
   

    this._empresasService.createEmpresa(empresaNueva)
      .subscribe((resp: any) => {
        this.obtenerEmpresas();
        console.log(resp);
        swal({
          title: 'Empresa creada',
          text: 'Se ha creado la empresa  ' + resp.nombre + ' correctamente.',
          icon: 'success',
        });
      });

  }
  obtenerEmpresas() {
    this._empresasService
      .getEmpresas(this.paginaActual)
      .subscribe((resp: any) => {
        console.log(resp);
        this.empresas = resp.empresas;
        this.paginacion = resp.paginacion;
        this.paginasTotales = resp.paginacion.paginas;
        console.log(this.empresas);
        this.editar=false;
      });
  }

  cambiarPagina(valor: number) {
    let desde = this.paginaActual + valor;
    if (desde >= this.paginasTotales) {
      return;
    }
    if (desde < 0) {
      return;
    }
    return desde;
  }

  guardarCambios(empresa: Empresa) {
    console.log(empresa);
    this._empresasService
      .updateEmpresa(empresa)
      .subscribe((resp) => console.log(resp));
    this.obtenerEmpresas();
  }

  editarFila(id: any) {
    if (this.editar) {
      this.editar = false;
      this.idFilaEditar = '';
    } else {
      this.idFilaEditar = id;
      this.editar = true;
    }

    console.log(this.idFilaEditar);
  }

  eliminarEmpresa(empresa: Empresa){
    swal({
      title: '¿Está seguro?',
      text: 'Está a punto de eliminar la empresa '+ empresa.nombre,
      icon: 'warning',
      buttons: ['Cancelar', 'Aceptar'],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this._empresasService.deleteEmpresa(empresa)
          .subscribe( borrado =>{
            this.obtenerEmpresas();
          });
        }

    });

    this._empresasService.deleteEmpresa(empresa)
  }

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      cif: new FormControl(null, Validators.required)
    });
  }
}
