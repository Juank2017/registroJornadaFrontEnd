import {timer, Observable, Subject} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import { valorReloj } from './valorReloj';


export class RelojService {
  clock: Observable <Date>;
  infofecha$ = new Subject<valorReloj>();
  vr: valorReloj;
  ampm: string;
  hours: number;
  minute: string;
  weekday: string;
  months: string;
  constructor() {
    this.clock = timer(0, 1000).pipe(map(t => new Date()), shareReplay(1));
   }
   getInfoReloj(): Observable<valorReloj>{
     this.clock.subscribe(t => {
      
      this.hours = t.getHours();
     // this.hours = this.hours ? this.hours : 12;
      this.vr = {
         hora: t.getHours(),
         minutos: (t.getMinutes() < 10) ? '0' + t.getMinutes() : t.getMinutes().toString(),
         ampm: t.getHours() > 11 ? 'PM' : 'AM',
         diaymes: t.toLocaleString('es-ES', { day: '2-digit', month: 'long' }).replace('.', '').replace('-', ' '),
         fecha: t.toLocaleString('en-CA', {year: 'numeric' , month: 'numeric', day: '2-digit' }).replace('/', '-').replace('/', '-'),
         diadesemana: t.toLocaleString('es-ES', { weekday: 'long' }).replace('.', ''),
         segundo: t.getSeconds() < 10 ? '0' + t.getSeconds() : t.getSeconds().toString()
       };
     
      this.infofecha$.next(this.vr);
     });
     return this.infofecha$.asObservable();
   }
}
