import { Component, OnInit, Input } from '@angular/core';

import { MapService } from '../../services/map/map.service';
/**
 * componente para mostrar el mapa.
 */
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styles: [
  ]
})
export class MapComponent implements OnInit {


@Input() direccion: string;

  constructor(public _mapService: MapService) {

    console.log(this.direccion);

     }




  ngOnInit(): void {

  }

}
