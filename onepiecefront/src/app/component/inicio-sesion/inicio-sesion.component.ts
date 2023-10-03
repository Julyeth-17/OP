import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-inicio-sesion',
    templateUrl: './inicio-sesion.component.html',
    styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {

    visible: boolean = true;
    changetype: boolean = true;

    formularioInicioSesion: FormGroup
    regexAlfanum = /[a-zA-Z0-9_.]+$/

    constructor(private fb: FormBuilder) {
        this.formularioInicioSesion = this.fb.group({
            usuario: ['', [Validators.required, Validators.pattern(this.regexAlfanum)]],
            contraseña: ['', [Validators.required, Validators.pattern(this.regexAlfanum)]]
        })
    }

    verpass(){
        this.visible = !this.visible
        this.changetype = !this.changetype
    }

    enviarFormulario() {
        console.log(this.formularioInicioSesion)
    };
}
