import { Component, OnInit } from '@angular/core';
import { iRegistro, Registro } from 'src/app/models/registro';
import { RegistroService } from 'src/app/services/registro.service'
import { ColDef, ColGroupDef } from '@ag-grid-community/core';
import { userColumns } from './usuarios-columns';
import Swal from 'sweetalert2'

@Component({
    selector: 'app-lista-usuarios',
    templateUrl: './lista-usuarios.component.html',
    styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

    public listaUsuarios: iRegistro[] = [];
    public columnDefs: (ColDef<iRegistro, any> | ColGroupDef<iRegistro>)[] = userColumns;

    defaultColDef: ColDef = {
        flex: 1,
    };

    pagina: number = 1;

    atras: any = null
    siguiente: any = null

    constructor(private _registroService: RegistroService) {

    }

    ngOnInit(): void {
        this.traerUsuarios();
    }

    traerUsuarios() {
        console.log(this.pagina);
        this._registroService.postUsuarios({
            "pagina": this.pagina,
            "limite": 7
        }).subscribe(data => {
            console.log(data.docs)
            this.listaUsuarios = data.docs
        }, error => {
            console.log(error)
        })
    }

    next() {
        this.pagina = this.pagina + 1;
        this.traerUsuarios()
    }

    back() {
        this.pagina = this.pagina -1;
        this.traerUsuarios()
        console.log(this.pagina);
    }

    eliminarUsuario(id: any) {
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
                this._registroService.deleteUsuario(id).subscribe(data => {
                    Swal.fire({
                        title: 'Y se marchó, y a su barco le llamó "libertad"',
                        imageUrl: 'https://media.tenor.com/JYkfBdbO1JkAAAAC/one-piece-boat.gif',
                        imageWidth: 400,
                        imageHeight: 200,
                        timer: 2000
                    })
                    this.traerUsuarios();
                }, error => {
                })
            }
        })
    }
}
