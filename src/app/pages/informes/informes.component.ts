import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SedesService } from '../../services/sedes/sedes.service';
import { EmpleadosService } from '../../services/empleados/empleados.service';
import { MarcajesService } from '../../services/marcajes/marcajes.service';
import { Sede } from '../../models/sede.model';
import { Marcado } from '../../models/marcado.model';
import { Empleado } from '../../models/empleado.model';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styles: [],
})
export class InformesComponent implements OnInit {
  paginacion: any;

  paginaActual = 1;
  paginasTotales: number;

  marcajes: any[] = [];
  sedes: Sede[] = [];
  empleados: any[] = [];
  usuario: Usuario = JSON.parse(localStorage.getItem('usuario'));
  nombreEmpresa = this.usuario.empresas[0].nombre;
  idEmpresa = this.usuario.empresas[0].id;

  constructor(
    public _sedesService: SedesService,
    public _empleadosService: EmpleadosService,
    public _marcajesService: MarcajesService
  ) {}

  ngOnInit(): void {
    this.obtenerSedes(this.idEmpresa);
  }

  obtenerSedes(idEmpresa: any) {
    this._sedesService.getSedeByEmpresaId(idEmpresa).subscribe((resp: any) => {
      this.sedes = resp;
    });
  }
  obtenerEmpleados(idSede: any) {
    let salida: Empleado[] = [];
    this._empleadosService
      .getEmpleadosEmpresa(this.idEmpresa, -1)
      .subscribe((resp: any) => {
        let empleados = resp.empleados;
        console.log(empleados);
        empleados.forEach((empleado) => {
          if (empleado.sede.id == idSede) {
            salida.push(empleado);
          }
        });
        console.log(salida);
      });
    return salida;
  }

  obtenerMarcados(idEmpleado: any) {
    this._marcajesService
      .obtenerMarcajes(idEmpleado, this.paginaActual.toString())
      .subscribe((resp: any) => {
        this.marcajes = resp.marcados;
        this.paginacion = resp.paginacion;
        this.paginasTotales = resp.paginacion.paginas;
      });
  }
  cambiarPagina(pagina: any) {}

  filtrarSede(event) {
    console.log(event);
    this.empleados = this.obtenerEmpleados(event);
  }
  filtrarEmpleado(id) {
    this.obtenerMarcados(id);
  }
}
