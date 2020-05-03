import { Component, OnInit } from '@angular/core';
import { EmpresasService } from '../../services/empresas/empresas.service';
import { Empresa } from 'src/app/models/empresa.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import swal from 'sweetalert';
/**
 * Componente para listar y crear empresas
 */
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

  constructor(public _empresasService: EmpresasService) {
    this.obtenerEmpresas();
  }
  /**
   * Llama al servicio para crear la empresa
   */
  crearEmpresa() {
    
    const empresaNueva: Empresa = new Empresa(
      null,
      this.formulario.value.nombre,
      this.formulario.value.cif
    );

    this._empresasService.createEmpresa(empresaNueva).subscribe((resp: any) => {
      this.obtenerEmpresas();
      console.log(resp);
      swal({
        title: 'Empresa creada',
        text: 'Se ha creado la empresa  ' + resp.nombre + ' correctamente.',
        icon: 'success',
      });
    });
  }
  /**
   * Obtiene el listado de empresas
   */
  obtenerEmpresas() {
    this._empresasService
      .getEmpresas(this.paginaActual)
      .subscribe((resp: any) => {
        
        this.empresas = resp.empresas;
        this.paginacion = resp.paginacion;
        this.paginasTotales = resp.paginacion.paginas;
        this.editar = false;
      });
  }

  /**
   * función para cambiar el número de página actual para la paginación
   * responde al evento click asociado a los enlaces siguiente y anterior en el html
   * @param valor 
   */
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

  /**
   * Actualiza los cambios de una empresa
   * @param empresa 
   */
  guardarCambios(empresa: Empresa) {
    
    this._empresasService
      .updateEmpresa(empresa)
      .subscribe((resp) => console.log(resp));
    this.obtenerEmpresas();
  }

  /**
   * Función para activar la edición de una línea de la tabla
   * asociada al evento click del botón editar
   * @param id 
   */
  editarFila(id: any) {
    if (this.editar) {
      this.editar = false;
      this.idFilaEditar = '';
    } else {
      this.idFilaEditar = id;
      this.editar = true;
    }

    
  }
 /**
  * Elimina una empresa
  * @param empresa 
  */
  eliminarEmpresa(empresa: Empresa) {
    swal({
      title: '¿Está seguro?',
      text: 'Está a punto de eliminar la empresa ' + empresa.nombre,
      icon: 'warning',
      buttons: ['Cancelar', 'Aceptar'],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this._empresasService.deleteEmpresa(empresa).subscribe((borrado) => {
          this.obtenerEmpresas();
        });
      }
    });

    
  }

  /**
   * Al iniciar el componente se crea el formulario.
   */
  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      cif: new FormControl(null, Validators.required),
    });
  }
}
