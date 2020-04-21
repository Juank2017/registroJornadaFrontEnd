import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { Turno } from 'src/app/models/turno.model';

import { Empleado } from '../../../models/empleado.model';
import { EmpleadosService, UsuarioService } from 'src/app/services/service.index';
import { Sede } from 'src/app/models/sede.model';
import swal from 'sweetalert';
import { EmpresasService } from '../../../services/empresas/empresas.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styles: [
  ]
})
export class EmpleadosComponent implements OnInit {

  usuario: Usuario = new Usuario('', '', '', [] , []);
  turno: Turno = new Turno('', '');
  sede: Sede = new Sede('' , '' , '', '', '', null);
  empleado: Empleado = new Empleado('', '', '', '', this.usuario, this.turno, this.sede);

  paginacion: any;
  empleados: Empleado[] = [];


  paginaActual = 1;
  paginasTotales: number;
  empresas: any;

  idEmpresaSeleccionada = '';

  constructor(
    public _empleadosService: EmpleadosService,
    public userService: UsuarioService,
    public _empresasService: EmpresasService
  ) {
    // al construir el componente cargamos las empleados para pasarlas a la vista
    this.obtenerEmpleados();
    console.log(this.empleados);
  }
  /**
   * obtiene las empleados
   */
  obtenerEmpleados() {
    this._empleadosService.getEmpleados(this.paginaActual).subscribe((resp: any) => {
      this.empleados = resp.empleados;
      this.paginacion = resp.paginacion;
      this.paginasTotales = resp.paginacion.paginas;
    });
  }

  filtrarEmpresa(id: string){
    console.log(id);
    this.idEmpresaSeleccionada = id;
    this._empleadosService.getEmpleadosEmpresa(id, this.paginaActual).subscribe((resp: any) => {
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
    if (this.idEmpresaSeleccionada !== ''){
      this.filtrarEmpresa(this.idEmpresaSeleccionada);
    }else {
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
      text: 'Está a punto de eliminar la empleado ' + empleado.nombre,
      icon: 'warning',
      buttons: ['Cancelar', 'Aceptar'],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this._empleadosService.deleteEmpleado(empleado).subscribe((borrado) => {
          this.obtenerEmpleados();
        });
      }
    });

    this._empleadosService.deleteEmpleado(empleado);
  }

  ngOnInit(): void {    // cargamos las empresas para rellenar el select en el formulario
    this._empresasService.getEmpresas(-1).subscribe((resp: any) => {
      console.log(resp.empresas);
      this.empresas = resp.empresas;
    }); }
}


