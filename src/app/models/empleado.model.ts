import { Sede } from './sede.model';
import { Usuario } from './usuario.model';
import { Turno } from './turno.model';

export class Empleado{
    constructor(public id: string,
                public nombre: string,
                public apellidos: string,
                public dni: string,
                public usuario: Usuario,
                public turno: Turno,
                public sede: Sede) {

    }
}
