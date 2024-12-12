import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroService } from 'src/app/services/registro.service'
import { Registro } from 'src/app/models/registro';
import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { columnDefs } from './usuarios-columns';
import Swal from 'sweetalert2'

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  public listaUsuarios: Registro[] = [];
  public columnDefs: ColDef[] = columnDefs;
  public themeClass: string = "ag-theme-quartz";
  public defaultColDef: ColDef = {
    resizable: true,
    sortable: true,
  };

  public formularioEdicion: FormGroup;
  public usuarioSeleccionado: Registro | undefined = undefined;

  constructor(private _registroService: RegistroService, private fb: FormBuilder) {
    this.formularioEdicion = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      usuario: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', Validators.minLength(8)],
    });
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

  editarUsuario(id: string) {
    this._registroService.getUsuario(id).subscribe((usuario: Registro) => {
      const htmlContent = `
          <form id="formularioEdicion">
            <div>
              <label for="correo">Correo:</label>
              <input id="correo" class="swal2-input" type="email" value="${usuario.correo}">
            </div>
            <div>
              <label for="usuario">Usuario:</label>
              <input id="usuario" class="swal2-input" type="text" value="${usuario.usuario}">
            </div>
            <div>
              <label for="password">Contraseña:</label>
              <input id="password" class="swal2-input" type="password" placeholder="opcional">
            </div>
          </form>
        `;

      Swal.fire({
        title: 'Editar Usuario',
        html: htmlContent,
        focusConfirm: false,
        showCancelButton: true,

        preConfirm: () => {
          const correo = (document.getElementById('correo') as HTMLInputElement).value;
          const usuarioEditado = (document.getElementById('usuario') as HTMLInputElement).value;
          const password = (document.getElementById('password') as HTMLInputElement).value;

          const datosActualizados: Registro = {
            correo,
            usuario: usuarioEditado,
            password: password ? password : usuario.password
          };

          return this._registroService.putUsuario(id, datosActualizados).toPromise();
        }
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: '¡Usuario actualizado!',
            icon: 'success',
            timer: 1500
          });
          this.traerUsuarios()
        }
      }).catch(error => {
        console.error('Error al actualizar el usuario:', error);
        Swal.fire('Error', 'No se pudo actualizar el usuario', 'error');
      });
    }, error => {
      console.log('Error al obtener usuario para editar:', error);
    });
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

  onActionClick(event: any) {
    const actionType = event.event.target.getAttribute('data-action');
    const userId = event.event.target.getAttribute('data-id');

    if (actionType === 'edit') {
      this.editarUsuario(userId);
    } else if (actionType === 'delete') {
      this.eliminarUsuario(userId);
    }
  }
}
