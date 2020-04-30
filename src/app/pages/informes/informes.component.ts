import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SedesService } from '../../services/sedes/sedes.service';
import { EmpleadosService } from '../../services/empleados/empleados.service';
import { MarcajesService } from '../../services/marcajes/marcajes.service';
import { Sede } from '../../models/sede.model';
import { Marcado } from '../../models/marcado.model';
import { Empleado } from '../../models/empleado.model';
import { NotificacionesService } from '../../services/notificaciones/notificaciones.service';
import { Router } from '@angular/router';
import { InformesService } from '../../services/informes/informes.service';
import pdfMake from '../../../../node_modules/pdfmake/build/pdfmake';
import pdfFonts from '../../../../node_modules/pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styles: [],
})
export class InformesComponent implements OnInit {
  paginacion: any;

  paginaActual = 1;
  paginasTotales: number;

  marcajes: any[] = [];
  sedes: Sede[] = [];
  empleados: any[] = [];
  usuario: Usuario = JSON.parse(localStorage.getItem('usuario'));
  nombreEmpresa = this.usuario.empresas[0].nombre;
  idEmpresa = this.usuario.empresas[0].id;

  constructor(
    public _sedesService: SedesService,
    public _empleadosService: EmpleadosService,
    public _marcajesService: MarcajesService,
    public _notificacionesService: NotificacionesService,
    public _informesService: InformesService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerSedes(this.idEmpresa);
  }

  obtenerSedes(idEmpresa: any) {
    this._sedesService.getSedeByEmpresaId(idEmpresa).subscribe((resp: any) => {
      this.sedes = resp;
    });
  }
  obtenerEmpleados(idSede: any) {
    let salida: Empleado[] = [];
    this._empleadosService
      .getEmpleadosEmpresa(this.idEmpresa, -1)
      .subscribe((resp: any) => {
        let empleados = resp.empleados;
        console.log(empleados);
        empleados.forEach((empleado) => {
          if (empleado.sede.id == idSede) {
            salida.push(empleado);
          }
        });
        console.log(salida);
      });
    return salida;
  }

  obtenerMarcados(idEmpleado: any) {
    this._marcajesService
      .obtenerMarcajes(idEmpleado, this.paginaActual.toString())
      .subscribe((resp: any) => {
        this.marcajes = resp.marcados;
        console.log(this.marcajes);
        this.paginacion = resp.paginacion;
        this.paginasTotales = resp.paginacion.paginas;
      });
  }
  cambiarPagina(pagina: any) {}

  filtrarSede(event) {
    console.log(event);
    this.empleados = this.obtenerEmpleados(event);
  }
  filtrarEmpleado(id) {
    this._notificacionesService.idEmpleadoNotificar = id;
    this.obtenerMarcados(id);
  }
  notifica(marcado: any) {
    this._notificacionesService.rutaPadre = '/informes';
    this._notificacionesService.datosMarcadoNotificar = marcado;
    this.router.navigate(['/notificacion', 'nuevo']);
  }

  generatePdf() {
 
    const documentDefinition = this.getDocumentDefinition();
    pdfMake.createPdf(documentDefinition).print();
  }

  getDocumentDefinition() {
    return {
      content: [
        {
          image:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2xpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowODNFNEJCQjFEQzIxMUU3OERFRkU4NjlBMUU3RjM5RCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5RDlBRDQ3QTg0NDExMUU3ODM2Nzk0NTIyNjExRUVBNCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5RDlBRDQ3OTg0NDExMUU3ODM2Nzk0NTIyNjExRUVBNCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjQwNDUyRjkxN0QwMjExRTdBMDg1OTk1ODJGNTVFMzcwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQwNDUyRjkyN0QwMjExRTdBMDg1OTk1ODJGNTVFMzcwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+a5xIawAAAtZJREFUeNrsmEtIlFEUx520MRryUamtEzOIDKIghRZFjZtWQlaLoMdKjax1iyCidUnZRqIIsgcJ0aYX1SqjxyqqASFoG0UzJYHWMP0P/Ac+7J7r+WZuNsQc+OFw7nfP/fvde8937k0UCoWaSrZFNRVuVYH/vcA6l7Nj3SZL38WgF+wEm8Fq0MS2LPgAXoKH4D74OV/AqbevbALnMRFxDAyCFuWZNtINjoLP4AI4S/F/bYr3ggw46RHnspXsk2GM4AJrwSgY55sp1doYY5QxgwiUQDfBQMC1P8CYtSEEyrrpMw78FfwwPisxz5UrcA844mn/Ba6ANFgGloMUN5L4LvMZzYY4RkkCZZART/sk2AAOMJVMR9py9B0EXeCZJ85IJD3FEiippFVpk/WzDbwzTOV7sJ19XNbKsWIJTDLPuew52A9mYmyKGfaZVNoHOaZZYFrJc7KeDoHZEnbuLPu61mQLx4wl0GXjnLI/vo7gNtdejr87HM9Jor6mxO6NI3Cj4r/l8HWCF0wbDaSPvk5jDHVMTeAah09K7ycO/xllFzaxba49ZSzXLJgFNjp82TmppGg7POvOtVSmlYKhsdxiIRnwU5e0xtcE5hy+lPJfPvIIeaC8qVS51cyU4t/q8J1QpizLNkuM2AJfK/7dSurYAibAdzJBX8YYQ7WE61yMkn8X/txVEnWXkgsttha80Sp5lPwJ6xuUtfNFOcNcKnHDJNm3LsQUy2fpvNImU3cV1McYp559ukMeO6VQ/aS09YPHoN0wRjuf7Q99Ls7yRKZZD8utMSbraOpooG+Mz/QEPRdH7AbTwpBnXR0mxZJfpnPpQt4sDDNtWKw5pDirwDzXz8VKvpvJs+rd59k4C3c347Hr4B44znW5Ikbfbzw8SaL+yLuaJWA9kA/DqhACi7tbrjFOswpORy6PmiObpXh5JDn1DsXlPXnylPlTV0lWvcCsCvzX9luAAQARlpHG7ldESwAAAABJRU5ErkJggg==',
          width: 75,
          alignment: 'left',
        },
        {
          text: 'Informe de marcajes  ',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20],
        },
        {
          columns: [
            [
              {
                text: 'Empleado',
                style: 'name',
              },
              {
                text: 'Nombre: ' + this.marcajes[0].empleado.nombre,
              },
              {
                text: 'Apellidos : ' + this.marcajes[0].empleado.apellidos,
              },
            ],
          ],
        },
        {
          style: 'table',
          table: {
            widths: ['auto', 'auto', 'auto', 'auto'],
            body: [
              [
                { text: 'Fecha', style: 'tableHeader' },
                { text: 'Inicio', style: 'tableHeader' },
                { text: 'Fin', style: 'tableHeader' },
                { text: 'tipo', style: 'tableHeader' },
              ],
              ...this.marcajes.map((ed) => [
                ed.fecha,
                ed.horaInicio,
                ed.horaFinal,
                ed.tipo_marcaje.tipo_marcaje,
              ]),
            ],
          },
        },
      ],
      styles: {
        name: {
          fontSize: 16,
          bold: true,
        },
        table: {
          margin: [0, 15, 0, 15],
        },
      },
    };
  }
}
