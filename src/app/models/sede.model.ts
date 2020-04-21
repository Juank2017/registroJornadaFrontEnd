import { Empresa } from './empresa.model';

export class Sede{
    constructor(public id: string,
                public nombre: string,
                public direccion: string,
                public longitud: string,
                public latitud: string,
                public empresa: Empresa
                ){
        

    }
}