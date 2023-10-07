import { Component, ViewChild, ElementRef } from '@angular/core';
import { RegistroService } from 'src/app/services/registro.service'
import { Router } from '@angular/router';


@Component({
    selector: 'app-inicio-sesion',
    templateUrl: './inicio-sesion.component.html',
    styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {

    visible: boolean = true;
    changetype: boolean = true;

    userFormLogin = {
        usuario: '',
        password: ''
    }
    regexAlfanum = /[a-zA-Z0-9_.]+$/

    constructor(private _registroService: RegistroService) {

    }

    ingresoUsuario(){

        this._registroService.postIngresoUsuario(this.userFormLogin).subscribe(respuestaAPI => {
            sessionStorage.setItem('token', respuestaAPI.token);


            console.log(respuestaAPI);
        }, err => {
            console.log(this.userFormLogin);
        });

    }

    verpass(){
        this.visible = !this.visible
        this.changetype = !this.changetype
    }


}
