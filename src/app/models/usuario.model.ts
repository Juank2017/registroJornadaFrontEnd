export class Usuario{
    constructor(
        public idUSUARIO: string,
        public login: string,
        public password: string,
        public roles: string[],
        public empresas: string[]
    ){}
}
