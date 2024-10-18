import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { Registro } from '../models/registro';

@Injectable({
    providedIn: 'root'
})
export class RegistroService {

    url = 'http://localhost:3000/api/v1'

    constructor(private http: HttpClient) { }

    postUsuarios(parametros: any): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('token')}`)
        return this.http.post(`${this.url}/obtener-usuarios`, { parametros }, { headers })
    }

    getUsuarios(): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('token')}`)
        return this.http.get(`${this.url}/obtener-todos-los-usuarios`, { headers })
            .pipe(
                tap(data => console.log('Usuarios obtenidos:', data)),
                catchError(error => {
                    console.error('Error al obtener usuarios:', error);
                    return (error);
                })
            );
    }

    getUsuario(idUsuario: string): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('token')}`)
        return this.http.get(`${this.url}/obtener-usuario/${idUsuario}`, { headers })
    }

    postUsuario(registro: Registro): Observable<any> {
        return this.http.post(`${this.url}/crear-usuario`, registro)
    }

    putUsuario(idUsuario: string | undefined, dataUsuario: Registro): Observable<any> {
        return this.http.put(`${this.url}/actualizar-usuario/${idUsuario}`, dataUsuario)
    }

    deleteUsuario(idUsuario: string): Observable<any> {
        return this.http.delete(`${this.url}/eliminar-usuario/${idUsuario}`)
    }

    postIngresoUsuario(dataLogin: object): Observable<any> {
        return this.http.post(`${this.url}/ingreso`, dataLogin)
    }

    estaLogin() {
        // if(sessionStorage.getItem('token') != null){
        //     return true
        // } else {
        //     return false}

        return (sessionStorage.getItem('token') != null) ? true : false
    }


}
