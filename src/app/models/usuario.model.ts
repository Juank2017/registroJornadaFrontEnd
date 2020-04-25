import { Rol } from './rol.model';
import { Empresa } from './empresa.model';
export class Usuario{
    constructor(
        public idUSUARIO: string,
        public login: string,
        public password: string,
        public roles: Rol[],
        public empresas: Empresa[]
    ){}
}
