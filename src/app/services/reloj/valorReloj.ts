import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class valorReloj {
  hora: number;
  minutos: string;
  ampm: string;
  diadesemana: string;
  diaymes: string;
  fecha: string;
  segundo: string;
}
