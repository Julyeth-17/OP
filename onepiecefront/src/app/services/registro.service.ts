import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Registro } from '../models/registro';

@Injectable({
    providedIn: 'root'
})
export class RegistroService {

    url = 'http://localhost:3000/api/v1/'

    constructor(private http: HttpClient) { }

    getUsuarios():Observable<any>{
        return this.http.get(`${this.url}/obtener-usuarios`)
    }

    getUsuario(idUsuario:string):Observable<any>{
        return this.http.get(`${this.url}/obtener-usuario/${idUsuario}`)
    }

    postUsuario(registro: Registro):Observable<any>{
        return this.http.post(`${this.url}/crear-usuario`, registro)
    }

    putUsuario(idUsuario: string | null, dataUsuario: Registro):Observable<any>{
        return this.http.put(`${this.url}/actualizar-usuario/${idUsuario}`, dataUsuario)
    }

    deleteUsuario(idUsuario:string):Observable<any>{
        return this.http.delete(`${this.url}/eliminar-usuario/${idUsuario}`)
    }

}
