import { Injectable } from '@angular/core';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  /**
   * Muestra un alert con el mensaje de error
   * @param mensaje 
   */
  mostrarMensajeError(mensaje: string){
   
    swal({
      title: 'error',
      text: mensaje,
      icon: 'warning',
      dangerMode: true,
    });
  }

}
