import { Empleado } from './empleado.model';

export class Horario{
    constructor(public id: string,
                public hora_entrada: string,
                public hora_salida: string, 
                public empleado: Empleado){}
}