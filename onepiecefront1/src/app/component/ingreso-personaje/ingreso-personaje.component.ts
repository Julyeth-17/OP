import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Personajes } from "src/app/models/personajes";
import { PersonajesService } from "src/app/services/personajes.service";
import Swal from 'sweetalert2'

@Component({
    selector: 'app-ingreso-personaje',
    templateUrl: './ingreso-personaje.component.html',
    styleUrls: ['./ingreso-personaje.component.css']
})
export class IngresoPersonajeComponent implements OnInit {

    ingresoPersonaje: FormGroup
    regexAlfabetico = /^[A-Za-z, ]+$/
    regexNumero = /^[0-9]+$/
    regexUrl = /^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)+$/

    constructor(private fb: FormBuilder, private _personajeService: PersonajesService) {
        this.ingresoPersonaje = this.fb.group({
            nombre: ['', [Validators.required, Validators.pattern(this.regexAlfabetico)]],
            edad: ['', [Validators.required, Validators.pattern(this.regexNumero)]],
            tripulacion: ['', [Validators.required, Validators.pattern(this.regexAlfabetico)]],
            rol: ['', [Validators.required, Validators.pattern(this.regexAlfabetico)]],
            nacionalidad: ['', [Validators.required, Validators.pattern(this.regexAlfabetico)]],
            urlImagen: ['', [Validators.required, Validators.pattern(this.regexUrl)]],
        })
    }

    listaPersonajes: Personajes[] = [];

    obtenerPersonajes() {
        this._personajeService.getPersonajes().subscribe(data => {
            this.listaPersonajes = data
            console.log('data')
        }, error => {
            console.log('error')
        })
    }
    enviarFormulario() {
        // ? Manera en la que tomamos todos los valores del formulario din validar los tipos de dato
        //let manera1 = this.ingresoPersonaje.value

        // ? Manera en la que armamos el JSON que requiere la API para usar sus endpoint. Normalmente se hace de esta manera cuando el formulario tiene campos que no necesitamos enviar a la API.
        // const PersonajeFormulario: Personajes = {
        //     nombre: this.ingresoPersonaje.get('nombre')?.value,
        //     edad: this.ingresoPersonaje.get('edad')?.value,
        //     rol: this.ingresoPersonaje.get('rol')?.value
        //     nacionalidad: this.ingresoPersonaje.get('nacionalidad')?.value
        //     urlImagen: this.ingresoPersonaje.get('urlImagen')?.value
        // }


        // ? Manera en la cual tomamos todos los campos del formulario y validamos la estructura con el modelo creado
        let formularioData: Personajes = this.ingresoPersonaje.value

        this._personajeService.postPersonaje(formularioData).subscribe(data => {
            Swal.fire({
                title: '¡El personaje ha sido guardado!',
                imageUrl: 'https://media.tenor.com/zo9_A7YqNk0AAAAC/sengoku-sengoku-one-piece.gif',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image',
                timer: 1500
            })
            this.ingresoPersonaje.reset()
            this.obtenerPersonajes()
        }, error => {

        })

    }

    borrarFormulario() {
        this.ingresoPersonaje.reset()
    }


    ngOnInit(): void {
        this.obtenerPersonajes()
    }

}


