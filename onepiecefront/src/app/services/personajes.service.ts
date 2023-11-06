import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Personajes } from '../models/personajes';

@Injectable({
    providedIn: 'root'
})
export class PersonajesService {

    //url = 'http://localhost:3000/api/v1'
    url = 'http://Taller-JuliethOP-1-913275889.us-east-1.elb.amazonaws.com:3000/api/v1';

    constructor(private http: HttpClient) { }

    postPersonajes(parametros: any):Observable<any>{
        return this.http.post(`${this.url}/obtener-personajes`, parametros)
    }

    getPersonaje(idPersonaje:string):Observable<any>{
        return this.http.get(`${this.url}/buscar-personajes/${idPersonaje}`)
    }

    postPersonaje(personaje: Personajes):Observable<any>{
        return this.http.post(`${this.url}/crear-personaje`, personaje)
    }

    putPersonaje(idPersonaje:string | null, dataPersonaje:Personajes):Observable<any>{
        return this.http.put(`${this.url}/actualizar-personaje/${idPersonaje}`, dataPersonaje)
    }

    deletePersonaje(idPersonaje:string):Observable<any>{
        return this.http.delete(`${this.url}/eliminar-personaje/${idPersonaje}`)
    }

}
