import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
/**
 * getiona la ruta que se muestar en los breadcrumbs
 */
@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent implements OnInit {

  titulo: string;

  constructor(private router: Router) {
    this.getDataRoute().subscribe((data) => this.titulo = data.titulo);
    
  }

  ngOnInit(): void {}

  getDataRoute() {
    return this.router.events.pipe(
      filter((evento) => evento instanceof ActivationEnd),
      filter((evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map((evento: ActivationEnd) => evento.snapshot.data)
    );
  }
}
