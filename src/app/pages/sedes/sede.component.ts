import { Component, OnInit } from '@angular/core';

import { SedesService } from '../../services/sedes/sedes.service';
import { Sede } from 'src/app/models/sede.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MapService } from '../../services/map/map.service';
import { EmpresasService } from '../../services/empresas/empresas.service';
import { Empresa } from 'src/app/models/empresa.model';
/**
 * Componente para el mantenimiento de una sede
 */
@Component({
  selector: 'app-sede',
  templateUrl: './sede.component.html',
  styles: [],
})
export class SedeComponent implements OnInit {
  latitude: number;
  longitude: number;
  zoom: number;
  empresas: Empresa[];
  direccionCoordenadas: string;
  empresa: Empresa = new Empresa('', '', '');
  sede: Sede = new Sede('', '', '', '', '', this.empresa);

  constructor(
    public _mapService: MapService,
    public activatedRoute: ActivatedRoute,
    public _sedesService: SedesService,
    public _empresasService: EmpresasService,
    public router: Router
  ) {}
  /**
   * procesa el formulario y actualiza o crea una sede
   * @param f
   */
  procesar(f: any) {
    if (f.invalid) {
      return;
    }
    // si el id de la sede viene vacio es que es una nueva y la crea
    if (this.sede.id === '') {
      const empresa = this.empresas.find((e) => (e.id = f.value.empresa));
      this.sede.empresa.nombre = empresa.nombre;
      this.sede.empresa.cif = empresa.cif;

      this._sedesService
        .createSede(this.sede)
        .subscribe(() => this.router.navigate(['/sedes']));
    } else {
      this._sedesService.updateSede(this.sede).subscribe(() => true);
    }
  }

  ngOnInit(): void {
    // cargamos las empresas para rellenar el select en el formulario
    this._empresasService.getEmpresas(-1).subscribe((resp: any) => {
      this.empresas = resp.empresas;
    });
    // se reciben los parametros, si no es nuevo se carga la sede, si no en blanco
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      if (id !== 'nuevo') {
        this.cargarSede(id);
      }
    });
  }
  /**
   * Obtiene las coordenadas por la dirección
   * @param direccion
   */
  obtenerCoordenadas(direccion: string) {
    this._mapService.getCoords(direccion).subscribe((resp: any) => {
      this._mapService.configurarMapa(resp[1], resp[0]);
      this.sede.latitud = resp[1];
      this.sede.longitud = resp[0];
    });
  }
  /**
   * Carga una sede por el id
   * @param id
   */
  cargarSede(id: string) {
    this._sedesService.getSede(id).subscribe((resp: any) => {
      this.sede = resp;
      // una vez recibe la sede configura el mapa con las coordenadas
      this._mapService.configurarMapa(this.sede.latitud, this.sede.longitud);
    });
  }
}
