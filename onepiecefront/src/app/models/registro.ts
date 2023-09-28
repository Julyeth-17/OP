export class Registro {

    _id?: string
    correo: string
    usuario: string
    contraseña: string

    constructor (correo: string, usuario: string, contraseña: string) {

        this.correo = correo;
        this.usuario = usuario;
        this.contraseña = contraseña;

    }

}
