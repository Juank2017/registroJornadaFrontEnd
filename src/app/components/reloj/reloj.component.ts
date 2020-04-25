import { Component, OnInit } from '@angular/core';
import { RelojService } from 'src/app/services/reloj/reloj.service';
import { valorReloj } from "src/app/services/reloj/valorReloj";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-relojp',
  templateUrl: './reloj.component.html',
  styles: [
  ]
})
export class RelojComponent implements OnInit {

  datos$: Observable<valorReloj>;
  hora: number;
  minutos: string;
  dia: string;
  fecha: string;
  ampm: string;
  segundos: string;
 fechaCompleta: string;
  constructor(private segundo: RelojService) { }

  ngOnInit() {
    this.datos$=this.segundo.getInfoReloj();
    this.datos$.subscribe(x => {
      
      this.hora = x.hora;
      this.minutos = x.minutos;
      this.dia = x.diadesemana;
      this.fecha = x.diaymes;
      this.fechaCompleta = x.fecha;
      this.ampm = x.ampm;
      this.segundos = x.segundo;
    });
    console.log(this.fecha);
  }

}
