import { Component, OnInit } from '@angular/core';
import { Registro } from 'src/app/models/registro';
import { RegistroService } from 'src/app/services/registro.service'
import Swal from 'sweetalert2'

@Component({
    selector: 'app-lista-usuarios',
    templateUrl: './lista-usuarios.component.html',
    styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

    listaUsuarios: Registro[] = [];

    constructor(private _registroService: RegistroService) {

    }

    ngOnInit(): void {
        this.traerUsuarios();
    }

    traerUsuarios() {
        this._registroService.getUsuarios().subscribe(data => {
            this.listaUsuarios = data
        }, error => {
            console.log(error)
        })
    }

    eliminarUsuario(id: any) {
        Swal.fire({
            title: '¿Segura?',
            text: '¿Segura... segura?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Borre esa mondá',
        }).then((result) => {
            if (result.isConfirmed) {
                this._registroService.deleteUsuario(id).subscribe(data => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Y se marchó, y a su barco le llamó Libertad'
                    })
                    this.traerUsuarios();
                }, error => {

                })
            }
        })
    }
}
