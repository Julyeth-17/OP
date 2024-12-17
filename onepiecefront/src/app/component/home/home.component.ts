import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Personajes } from "src/app/models/personajes";
import { PersonajesService } from "src/app/services/personajes.service";
import { RegistroService } from 'src/app/services/registro.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    listaPersonajes: Personajes [] = [];

    constructor(private _personajeService: PersonajesService, public _registroService: RegistroService) {

    }
        ngOnInit(): void {
            // this.obtenerPersonajes()
        }
    }
