import { Component, OnInit } from '@angular/core';

import { Empleado } from '../../../models/empleado.model';

import swal from 'sweetalert';

import {
  EmpleadosService,
  UsuarioService,
} from '../../../services/service.index';
import { EmpresasService } from '../../../services/service.index';
import { SedesService } from '../../../services/service.index';
 /**
  * Componente para mostrar la lista de empleados
  */
@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styles: [],
})
export class EmpleadosComponent implements OnInit {
  paginacion: any; // recibe los datos para la paginación
  empleados: Empleado[] = [];

  paginaActual = 1;
  paginasTotales: number;
  empresas: any;

  idEmpresaSeleccionada = '';

  constructor(
    public _empleadosService: EmpleadosService,
    public userService: UsuarioService,
    public _empresasService: EmpresasService,
    public _sedesService: SedesService
  ) {
    // al construir el componente cargamos las empleados para pasarlas a la vista
    if (this.idEmpresaSeleccionada !== '') {
      this.filtrarEmpresa(this.idEmpresaSeleccionada);
    }

  }
  /**
   * obtiene las empleados desde el servicio. Recibe la lista de empleados 
   * y los datos para paginación, número de registros y número de páginas.
   */
  obtenerEmpleados() {
    this._empleadosService
      .getEmpleados(this.paginaActual)
      .subscribe((resp: any) => {
        this.empleados = resp.empleados;
        this.paginacion = resp.paginacion;
        this.paginasTotales = resp.paginacion.paginas;
      });
  }
   /**
    * Obtiene los empleados de una empresa.
    * Recibe el id de la empresa. 
    * @param id 
    */
  filtrarEmpresa(id: string) {
    
    this.idEmpresaSeleccionada = id;
    // actualiza la variable del servicio que tiene la empresa seleccionada para poder usar ese valor desde el componente Empleado.
    this._sedesService.empresaSeleccionada = this.idEmpresaSeleccionada;
    this._empleadosService
      .getEmpleadosEmpresa(id, this.paginaActual)
      .subscribe((resp: any) => {
        this.empleados = resp.empleados;
        this.paginacion = resp.paginacion;
        this.paginasTotales = resp.paginacion.paginas;
      });
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
    if (this.idEmpresaSeleccionada !== '') {
      this.filtrarEmpresa(this.idEmpresaSeleccionada);
    } else {
      this.obtenerEmpleados();
    }
  }

  /**
   * Elimina la empleado.
   * @param empleado
   */
  eliminarEmpleado(empleado: Empleado) {
    swal({
      title: '¿Está seguro?',
      text: 'Está a punto de eliminar el empleado ' + empleado.nombre,
      icon: 'warning',
      buttons: ['Cancelar', 'Aceptar'],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this._empleadosService.deleteEmpleado(empleado).subscribe((borrado) => {
          this.filtrarEmpresa(this.idEmpresaSeleccionada);
        });
      }
    });

    this._empleadosService.deleteEmpleado(empleado);
  }
  /**
   * Al inicializar el componente cargamos las empresas para ponerlas en el select del formulario.
   */
  ngOnInit(): void {
    // cargamos las empresas para rellenar el select en el formulario
    this._empresasService.getEmpresas(-1).subscribe((resp: any) => {
      console.log(resp.empresas);
      this.empresas = resp.empresas;
    });
  }
}
