import { Empleado } from './empleado.model';
export class Notificacion{
    constructor(
        public id: string,
        public fecha: Date,
        public texto_notificacion: string,
        public texto_respuesta: string,
        public leida: string,
        public empleado: Empleado,
        public loginEmisor: string
    ){

    }
}