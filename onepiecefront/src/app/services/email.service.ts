import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EmailService {

    url = 'http://localhost:3000/api/v1'

    constructor(private http: HttpClient) { }

    recordarContrasena(parametros: any):Observable<any>{
        return this.http.post(`${this.url}/recuperar-contrasena`, parametros)
    }
}
