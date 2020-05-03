import { Component, OnInit } from '@angular/core';
import { Sede } from 'src/app/models/sede.model';
import { SedesService } from 'src/app/services/service.index';
import swal from 'sweetalert';
import { UsuarioService } from '../../services/usuario/usuario.service';
/**
 * Componente para mostrar las sedes
 */
@Component({
  selector: 'app-sedes',
  templateUrl: './sedes.component.html',
  styles: [],
})
export class SedesComponent implements OnInit {
  paginacion: any;
  sedes: Sede[] = [];
  sede: Sede;

  paginaActual = 1;
  paginasTotales: number;

  constructor(
    public _sedesService: SedesService,
    public userService: UsuarioService
  ) {
    // al construir el componente cargamos las sedes para pasarlas a la vista
    this.obtenerSedes();
  }
  /**
   * obtiene las sedes
   */
  obtenerSedes() {
    this._sedesService.getSedes(this.paginaActual).subscribe((resp: any) => {
      this.sedes = resp.sedes;
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

    this.obtenerSedes();
  }

  /**
   * Elimina la sede.
   * @param sede
   */
  eliminarSede(sede: Sede) {
    swal({
      title: '¿Está seguro?',
      text: 'Está a punto de eliminar la sede ' + sede.nombre,
      icon: 'warning',
      buttons: ['Cancelar', 'Aceptar'],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this._sedesService.deleteSede(sede).subscribe((borrado) => {
          this.obtenerSedes();
        });
      }
    });

    this._sedesService.deleteSede(sede);
  }

  ngOnInit(): void {}
}
