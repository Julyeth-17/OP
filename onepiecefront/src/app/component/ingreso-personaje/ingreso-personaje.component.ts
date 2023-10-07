import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Personajes } from "src/app/models/personajes";
import { PersonajesService } from "src/app/services/personajes.service";
import { ActivatedRoute, Router, ExtraOptions } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
    selector: 'app-ingreso-personaje',
    templateUrl: './ingreso-personaje.component.html',
    styleUrls: ['./ingreso-personaje.component.css']
})
export class IngresoPersonajeComponent implements OnInit {

    ingresoPersonaje: FormGroup
    regexAlfabetico = /^[A-Za-z, ]+$/;
    regexNumero = /^[0-9]+$/;
    regexUrl = /^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)+$/;
    id: string | null;
    tituloPagina: string = 'Ingresa El Personaje';
    txtBoton: string = 'Enviar';
    pagina: number = 1;


    atras: any = null
    siguiente: any = null

    @ViewChild('formPersonajePEPE') formPersonajePEPE!: any

    constructor(private fb: FormBuilder, private _personajeService: PersonajesService, private router: Router, private idPersonajeRuta: ActivatedRoute) {
        this.ingresoPersonaje = this.fb.group({
            nombre: ['', [Validators.required, Validators.pattern(this.regexAlfabetico)]],
            edad: ['', [Validators.required, Validators.pattern(this.regexNumero)]],
            tripulacion: ['', [Validators.required, Validators.pattern(this.regexAlfabetico)]],
            rol: ['', [Validators.required, Validators.pattern(this.regexAlfabetico)]],
            nacionalidad: ['', [Validators.required, Validators.pattern(this.regexAlfabetico)]],
            urlImagen: ['', [Validators.required, Validators.pattern(this.regexUrl)]],
        })

        this.id = this.idPersonajeRuta.snapshot.paramMap.get('id')
    }

    listaPersonajes: Personajes[] = [];


    obtenerPersonajes() {
        this._personajeService.postPersonajes({
            "pagina": this.pagina,
            "limite": 5
        }).subscribe(data => {
            this.listaPersonajes = data.docs
            console.log(data)
            console.log(this.listaPersonajes)
        }, error => {
            console.log('error')
        })
    }

    next() {
        this.pagina = this.pagina + 1;
        this.obtenerPersonajes()

        console.log(this.pagina);
    }

    back() {
        this.pagina = this.pagina -1;
        this.obtenerPersonajes()
        console.log(this.pagina);
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

        if (!this.id) {
            console.log("holis")
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
            })
            return;
        }
        console.log(this.id)
        this._personajeService.putPersonaje(this.id, this.ingresoPersonaje.value).subscribe(data => {
            Swal.fire({
                title: 'Personaje Actualizado',
                imageUrl: 'https://media.tenor.com/EyFtj9wIuNIAAAAC/one-piece-nekomamushi.gif',
                imageWidth: 400,
                imageHeight: 300,
                timer: 1500
            })
            this.router.navigate(['/ingreso-personaje'])
        })
    }

    borrarFormulario() {
        this.ingresoPersonaje.reset()
    }

    eliminarPersonaje(id: any) {
        Swal.fire({
            title: '¿Segura?',
            text: '¿Segura... segura?',
            imageUrl: 'https://media.tenor.com/FOoMkyH4oG8AAAAC/luffy-one-piece.gif',
            imageWidth: 400,
            imageHeight: 300,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Borre esa mondá',
        }).then((result) => {
            if (result.isConfirmed) {
                this._personajeService.deletePersonaje(id).subscribe(data => {
                    Swal.fire({
                        title: 'Y se marchó, y a su barco le llamó "libertad"',
                        imageUrl: 'https://media.tenor.com/JYkfBdbO1JkAAAAC/one-piece-boat.gif',
                        imageWidth: 400,
                        imageHeight: 200,
                        timer: 2000
                    })
                    this.obtenerPersonajes();
                }, error => {
                })
            }
        })
    }

    ngOnInit(): void {
        this.obtenerPersonajes()
        this.accionSolicitada()
    }

    accionSolicitada() {
        if (this.id != null) {
            this.tituloPagina = 'Actualizar Personaje'
            this.txtBoton = 'Guardar Cambios'
            this._personajeService.getPersonaje(this.id).subscribe(res => {
                this.ingresoPersonaje.setValue({
                    nombre: res.nombre,
                    edad: res.edad,
                    tripulacion: res.tripulacion,
                    rol: res.rol,
                    nacionalidad: res.nacionalidad,
                    urlImagen: res.urlImagen
                })
            }, error => {
                this.router.navigate(['/404']);
            });
        }
    }

    desplazar() {
        window.scrollTo(0, 0);
    }
}


