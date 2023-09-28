export class Personajes {

    _id?: string
    nombre: string
    edad: number
    tripulacion: string
    rol: string
    nacionalidad: string
    urlImagen: string

    constructor(nombre: string, edad: number, tripulacion:string, rol: string, nacionalidad: string, urlImagen: string) {

        this.nombre = nombre
        this.edad = edad
        this.tripulacion = tripulacion
        this.rol = rol
        this.nacionalidad = nacionalidad
        this.urlImagen = urlImagen
    }
}
