import {
  Component,
  OnInit

} from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { Turno } from 'src/app/models/turno.model';
import { Sede } from 'src/app/models/sede.model';
import { Empleado } from 'src/app/models/empleado.model';
import { Horario } from 'src/app/models/horario.model';
import { Rol } from '../../../models/rol.model';
import { Empresa } from 'src/app/models/empresa.model';
import { TurnoService } from '../../../services/turno/turno.service';
import { EmpleadosService } from '../../../services/service.index';
import { SedesService } from '../../../services/service.index';
import { UsuarioService } from '../../../services/service.index';
import { HorarioService } from '../../../services/service.index';
import { ErrorService } from '../../../services/service.index';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';




@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styles: [],
})
export class EmpleadoComponent implements OnInit {
  rol: Rol = new Rol('', '');
  usuario: Usuario = new Usuario('', '', '', [this.rol], []);
  turno: Turno = new Turno('', '');
  sede: Sede = new Sede('', '', '', '', '', null);
  empleado: Empleado = new Empleado(
    '',
    '',
    '',
    '',
    this.usuario,
    this.turno,
    this.sede
  );

  // variables para controlar los valores máximos y mínimos de los select de horas en el formulario
  minTimeEntrada: string;
  maxTimeEntrada: string;
  minTimeSalida: string;
  maxTimeSalida: string;
  minTimeEntradaPartido: string;
  maxTimeEntradaPartido: string;
  minTimeSalidaPartido: string;
  maxTimeSalidaPartido: string;

  horaEntrada: string;
  horaSalida: string;
  horaEntradaPartido: string;
  horaSalidaPartido: string;
  horario: Horario;

  horarios: Horario[] = []; // aqui se cargan los horarios de un empleado que ya existe.
  horariosActualizados: Horario[] = []; // aqui el horario actualizado que viene del formulario
  horarioPartido: Horario;
  roles: Rol[] = []; // los roles de la base de datos
  userRoles: Rol[] = []; // los roles que tenga un usuario concreto
  sedes: Sede[] = [];
  turnos: Turno[] = [];
  esEmpleado = true;
  esPartido = false;
  esNuevo = false;
  rolAdmin: Rol = new Rol('1', 'ADMIN_ROL');

  constructor(
    public _turnoService: TurnoService,
    public _sedesService: SedesService,
    public _empleadosService: EmpleadosService,
    public _usuariosService: UsuarioService,
    public activatedRoute: ActivatedRoute,
    public _horarioService: HorarioService,
    public router: Router,
    public _errorService: ErrorService
  ) {}

  /**
   * Carga una empleado por el id
   * @param id
   */
  cargarEmpleado(id: string) {
    this._empleadosService.getEmpleado(id).subscribe((resp: any) => {
      this.empleado = resp;
      this.userRoles = resp.usuario.roles;

      this.cargarHorario();
    });
  }

  /**
   * carga el horario del empleado seleccionado
   */
  cargarHorario() {
    this._horarioService
      .getHorarioByEmpleadoId(this.empleado.id)
      .subscribe((resp: Horario[]) => {
        this.horarios = resp;
        // si la respuesta tiene 2 elementos es que tiene turno partido y por lo tanto 2 horarios.
        if (resp.length === 2) {
          this.horaEntrada = resp[0].hora_entrada;
          this.horaSalida = resp[0].hora_salida;
          this.horaEntradaPartido = resp[1].hora_entrada;
          this.horaSalidaPartido = resp[1].hora_salida;
          this.esPartido = true;
        } else {
          this.horaEntrada = resp[0].hora_entrada;
          this.horaSalida = resp[0].hora_salida;
        }
      });
  }

  /**
   * función para usar con la directiva [conpareWith].
   * Con esta directiva se puede sincronizar la lista de un select con
   * los datos del modelo, de forma que al cargar un empleado se seleccionen
   * los elementos en el select.
   * @param rol1
   * @param rol2
   */

  compararRoles(rol1: Rol, rol2: Rol) {
    if (rol1 == null || rol2 == null) {
      return false;
    }
    return rol1.rol === rol2.rol;
  }
  /**
   * Función del ciclo de vida del componente.
   */
  ngOnInit(): void {
    // obtengo turnos para rellenar el selec en el formulario
    this._turnoService.obtenerTurnos().subscribe((resp: any) => {
      this.turnos = resp;
    });

    // obtengo las sedes

    this._sedesService
      .getSedeByEmpresaId(this._sedesService.empresaSeleccionada)
      .subscribe((resp: any) => (this.sedes = resp));

    // obtengo roles
    this._usuariosService.getRoles().subscribe((resp: any) => {
      resp.forEach((element) => {
        if (element.rol !== 'ADMIN_ROL') {
          this.roles.push(element);
        }
      });
    });

    // se reciben los parametros, si no es nuevo se carga el empleado, si no en blanco
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      if (id !== 'nuevo') {
        this.cargarEmpleado(id);
        // this.cargarHorario();
      } else {
        this.esNuevo = true;
      }
    });
  }
  /**
   * procesa los datos del formulario
   * @param f
   */
  procesar(f) {
    if (this.esEmpleado) {
      if (this.empleado.id === '') {
        // empleado nuevo

        // preparo horario
        if (f.value.turno === '3') {
          // es turno partido
          this.horario = new Horario(
            '',
            f.value.horaEntrada,
            f.value.horaSalida,
            this.empleado
          );
          this.horarioPartido = new Horario(
            '',
            f.value.horaEntradaPartido,
            f.value.horaSalidaPartido,
            this.empleado
          );
        } else {
          this.horario = new Horario(
            '',
            f.value.horaEntrada,
            f.value.horaSalida,
            this.empleado
          );
        }
        // preparo los roles
        const roles: Rol[] = [];
        f.value.rol.forEach((element) => {
          const rol: Rol = new Rol(element, '');
          roles.push(rol);
        });
        // preparo empresas
        const empresas: Empresa[] = [];
        const empresa: Empresa = new Empresa(
          this._sedesService.empresaSeleccionada,
          '',
          ''
        );
        empresas.push(empresa);

        // primero hay que cear el usuario
        const usuario = new Usuario(
          '',
          f.value.login,
          f.value.password,
          roles,
          empresas
        );
        this._usuariosService.createUser(usuario).subscribe(
          (resp: any) => {
            // una vez creado el usuario obtengo el id y lo actualizo en los datos del empleado a crear
            this.empleado.usuario.idUSUARIO = resp.id;
          },
          (err: any) => {},
          // una vez se ha completado la tarea asíncrona de crear el usuario, empezamos la de crear empleado
          () =>
            this._empleadosService.createEmpleado(this.empleado).subscribe(
              (resp: any) => {
                // una vez que se ha creado el empleado ya tengo el id
                this.empleado.id = resp[0].id;
              },

              (err: any) => {
                this._errorService.mostrarMensajeError(err.error.message);
              },
              () => {
                // una vez que se ha creado el empleado, creo su horario
                if (f.value.turno === 3) {
                  // es de turno partido
                  this._horarioService.crearHorario(this.horario).subscribe(
                    () => {},

                    (err: any) => {
                      this._errorService.mostrarMensajeError(err.error.message);
                    },
                    () => {
                      this._horarioService
                        .crearHorario(this.horarioPartido)
                        .subscribe();
                    }
                  );
                } else {
                  this._horarioService
                    .crearHorario(this.horario)
                    .subscribe((resp: any) => {
                      this.router.navigate(['/empleados']);
                    });
                }
              }
            )
        );
      } else {
        // actualizar empleado
        // preparo horario
        if (f.value.turno === '3') {
          // es turno partido
          this.horario = new Horario(
            '',
            f.value.horaEntrada,
            f.value.horaSalida,
            this.empleado
          );
          this.horarioPartido = new Horario(
            '',
            f.value.horaEntradaPartido,
            f.value.horaSalidaPartido,
            this.empleado
          );

          this.horariosActualizados = [this.horario, this.horarioPartido];
        } else {
          this.horario = new Horario(
            '',
            f.value.horaEntrada,
            f.value.horaSalida,
            this.empleado
          );

          this.horariosActualizados = [this.horario];
        }

        // actualizar empleado
        this._empleadosService.updateEmpleado(this.empleado).subscribe(
          (resp: any) => {},

          (err: any) => {
            this._errorService.mostrarMensajeError(err.error.message);
          },
          () => {
            // una vez ha actualizado el empleado hay que actualizar los horarios
            // la mejor solución ha sido borrar los horarios del usuario y crearlos de nuevo con los actualizados.
            // lo hago encadenando dos observables con forkJoin
            const servicio = this._horarioService;
            const obs1 = this.horarios.map((element) => {
              servicio.borrarHorario(element.id).subscribe((resp: any) => {});
            });
            // forkJoin(obs1);
            const obs = this.horariosActualizados.map((element) => {
              servicio.crearHorario(element).subscribe((resp: any) => {});
            });
            return forkJoin([obs, obs1]);
          }
        );
      }
    } else {
      // crea usuario tipo admin
      // preparo empresas
      const empresas: Empresa[] = [];
      const empresa: Empresa = new Empresa(
        this._sedesService.empresaSeleccionada,
        '',
        ''
      );
      empresas.push(empresa);
      // role
      const rol: Rol = new Rol(f.value.roles.id, f.value.roles.rol);
      const roles: Rol[] = [rol];
      // usuario para crear
      const usuario: Usuario = new Usuario(
        '',
        f.value.login,
        f.value.password,
        roles,
        empresas
      );
      // llama al servicio para crarlo
      this._usuariosService.createUser(usuario).subscribe(
        (resp: any) => {},
        (err: any) => {
          this._errorService.mostrarMensajeError(err.error.message);
        }
      );
    }
  }

  /**
   * Define los máximos y mínimos de los select de horas en el formulario según se seleccione un turno u otro.
   * @param turno
   */
  cargaHorario(turno: string) {
    switch (turno) {
      case '1':
        this.esPartido = false;
        this.minTimeEntrada = '08:00:00';
        this.maxTimeEntrada = '12:00:00';

        this.minTimeSalida = '12:00:00';
        this.maxTimeSalida = '15:00:00';
        break;
      case '2':
        this.esPartido = false;
        this.minTimeEntrada = '15:00:00';
        this.maxTimeEntrada = '18:00:00';

        this.minTimeSalida = '18:00:00';
        this.maxTimeSalida = '23:00:00';
        break;
      case '3':
        this.esPartido = true;
        this.minTimeEntrada = '09:00:00';
        this.maxTimeEntrada = '12:00:00';

        this.minTimeSalida = '12:00:00';
        this.maxTimeSalida = '15:00:00';
        this.minTimeEntradaPartido = '17:00:00';
        this.maxTimeEntradaPartido = '19:00:00';
        this.minTimeSalidaPartido = '20:00:00';
        this.maxTimeSalidaPartido = '22:00:00';

        break;
    }
  }
}
