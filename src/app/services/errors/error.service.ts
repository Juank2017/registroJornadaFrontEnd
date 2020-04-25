import { Injectable } from '@angular/core';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  mostrarMensajeError(mensaje: string){
   
    swal({
      title: 'error',
      text: mensaje,
      icon: 'warning',
      dangerMode: true,
    });
  }

}
