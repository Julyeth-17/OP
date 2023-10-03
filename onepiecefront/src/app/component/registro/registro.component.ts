import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { Registro } from 'src/app/models/registro';
import { RegistroService } from 'src/app/services/registro.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { min } from 'rxjs';

@Component({
    selector: 'app-registro',
    templateUrl: './registro.component.html',
    styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

    @ViewChild('txtPass2') inputPass2!: ElementRef
    @ViewChild('alertPass') alertPass!: ElementRef

    visible: boolean = true;
    changetype: boolean = true;

    formularioRegistro: FormGroup
    regexAlfanum = /^[a-zA-Z0-9_.]+$/;
    regexCorreo = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    id: string | null;
    tituloPagina: string = '¡Sé Parte de la Tripulación!';
    txtBoton: string = 'Enviar'

    constructor(private fb: FormBuilder, private _registroService: RegistroService, private router: Router, private idUsuarioRuta: ActivatedRoute) {
        this.formularioRegistro = this.fb.group({
            correo: ['', [Validators.required, Validators.pattern(this.regexCorreo)]],
            usuario: ['', [Validators.required, Validators.pattern(this.regexAlfanum), Validators.minLength(5)]],
            contraseña: ['', [Validators.required, Validators.pattern(this.regexAlfanum), Validators.minLength(8)]]
        })

        this.id = this.idUsuarioRuta.snapshot.paramMap.get('id')
    }

    listarUsuarios: Registro[] = [];

    obtenerUsuarios() {
        this._registroService.getUsuarios().subscribe(data => {
            this.listarUsuarios = data
            console.log('data')
        }, error => {
            console.log('error')
        })
    }

    verpass(){
        this.visible = !this.visible
        this.changetype = !this.changetype
    }

    enviarFormulario() {
        let registroData: Registro = this.formularioRegistro.value;
        console.log(this.id)
        if (this.id == null) {
            if (this.rectificarPass()) {
                this._registroService.postUsuario(registroData).subscribe(data => {
                    Swal.fire({
                        title: '¡Bienvenido!',
                        imageUrl: 'https://i.giphy.com/media/tuCFp8rod0x3O/giphy.webp',
                        imageWidth: 400,
                        imageHeight: 200,
                        imageAlt: 'Custom image',
                        timer: 1500
                    })
                    this.router.navigate(['/inicio-sesion']);
                })
            }
        } else {
            if (this.rectificarPass()) {
                this._registroService.putUsuario(this.id, this.formularioRegistro.value).subscribe(res => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Usuario Actualizado',
                        iconColor: '#2ce30b'
                    })
                    this.router.navigate(['/admin/usuarios-registrados'])
                })
            }
        }
    }

    rectificarPass() {
        let passUser = this.formularioRegistro.get('contraseña')?.value;
        if (passUser != this.inputPass2?.nativeElement.value) {
            this.alertPass.nativeElement.classList.remove('d-none')
            return false
        } else {
            this.alertPass.nativeElement.classList.add('d-none')
            return true
        }
    }

    ngOnInit(): void {
        this.accionSolicitada()
    }

    accionSolicitada() {
        if (this.id != null) {
            this.tituloPagina = 'Actualizar Usuario'
            this.txtBoton = 'Guardar Cambios'
            this._registroService.getUsuario(this.id).subscribe(res => {
                this.formularioRegistro.setValue({
                    correo: res.correo,
                    usuario: res.usuario,
                    contraseña: ''
                })
            }, error => {
                this.router.navigate(['/404']);
            });
        }
    }
}


// ngOnInit(): void {
//     this.obtenerUsuarios()
// ESTO ES PARA PINTAR LA INFORMACION, LISTAR LOS PERSONAJES, NO PARA EL REGISTRO DE USUARIOS
// }
