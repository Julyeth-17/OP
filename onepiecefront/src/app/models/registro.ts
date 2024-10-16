export class Registro {
    _id?: string
    correo: string
    usuario: string
    password: string

    constructor (correo: string, usuario: string, password: string) {
        this.correo = correo;
        this.usuario = usuario;
        this.password = password;
    }
}

export interface iRegistro {
    id?: string
    correo: string
    usuario: string
}
