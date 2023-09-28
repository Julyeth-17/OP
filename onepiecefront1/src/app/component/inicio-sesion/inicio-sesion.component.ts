import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-inicio-sesion',
    templateUrl: './inicio-sesion.component.html',
    styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {

    formularioInicioSesion: FormGroup
    regexAlfanum = /[a-zA-Z0-9_.]+$/

    constructor(private fb: FormBuilder) {
        this.formularioInicioSesion = this.fb.group({
            usuario: ['', [Validators.required, Validators.pattern(this.regexAlfanum)]],
            contraseña: ['', [Validators.required, Validators.pattern(this.regexAlfanum)]]
        })
    }
    enviarFormulario() {
        console.log(this.formularioInicioSesion)
    };
}
