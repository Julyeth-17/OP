import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Personajes } from "src/app/models/personajes";
import { PersonajesService } from "src/app/services/personajes.service";


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    listaPersonajes: Personajes [] = [];

    constructor(private _personajeService: PersonajesService) {

    }
        ngOnInit(): void {
            this.obtenerPersonajes()
        }

        obtenerPersonajes(){
            this._personajeService.getPersonajes().subscribe(data => {
                this.listaPersonajes = data
                console.log('data')
            }, error => {
                console.log('error')
            })
        }
    }
