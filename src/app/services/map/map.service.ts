import { Injectable, Input } from '@angular/core';
import { tileLayer, latLng, LatLng } from 'leaflet';
import { URL_GEOCODER } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';

/**
 * Servicio para configurar el mapa
 */
@Injectable({
  providedIn: 'root',
})
export class MapService {
  latitude: any = '' ;
  longitude: any = '';
  zoom: any = 18;
  // para modificar el centro una vez está configurado el mapa
  center: LatLng = latLng(36.4591006, -6.2057553);
  // objeto para configurar el mapa
  options: any;
  constructor(public http: HttpClient) {}
  /**
   * Configura las opciones del mapa. Las coordenadas del punto central y el zoom.
   * @param latitud
   * @param longitud
   */
  configurarMapa(latitud: any, longitud: any) {
    this.options = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: '...',
        }),
      ],
      zoom: this.zoom,
      center: latLng(latitud, longitud),
    };
    this.center = latLng(latitud, longitud);
  }
  /**
   * Obtiene las coordenadas a partir de una dirección usando el servicio nominatim de openstreetmaps.
   *
   * @param direccion
   */
  getCoords(direccion: string) {
    direccion = direccion.replace(/\s/g, '+');

    const url = URL_GEOCODER + '?q=' + direccion + '+Spain&format=geojson';

    return this.http.get(url).pipe(
      map((resp: any) => {
        console.log(resp.features[0].geometry.coordinates);
        if (resp.features.length === 0) {
          swal({
            title: 'Error',
            text:
              'No se han podido determinar las coordenadas, pruebe a usar el siguiente formato de dirección: "número nombre calle ciudad" ',
            icon: 'warning',
            buttons: ['Cancelar', 'Aceptar'],
            dangerMode: true,
          });
        } else {
          return resp.features[0].geometry.coordinates;
        }
      })
    );
  }

  /**
   * obtiene la localización actual usando el servicio del navegador.
   */
  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;},
        (err) => {
          console.log(err);
          // swal({
          //   title: 'error',
          //   text: 'No se ha podido geolocalizar, contacte con soporte para solucionarlo. Se va a registrar el marcado sin geolocalizar.',
          //   icon: 'warning',
          //   dangerMode: true,
          // });
          return false;
        });
    }
  }
}
