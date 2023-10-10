import { Component, ViewChild, ElementRef } from '@angular/core';
import { RegistroService } from 'src/app/services/registro.service'
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

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

    constructor(private _registroService: RegistroService, private router: Router) {}

    ingresoUsuario(){

        this._registroService.postIngresoUsuario(this.userFormLogin).subscribe(respuestaAPI => {
            sessionStorage.setItem('token', respuestaAPI.token);
            console.log(respuestaAPI);

            this.router.navigate(['/'])
        }, erro => {
            Swal.fire({
                icon: 'error',
                title: 'Usuario y/o contraseña inválidos',
                iconColor: '#ff0d0d'
            })
        });
    }

    verpass(){
        this.visible = !this.visible
        this.changetype = !this.changetype
    }


}
