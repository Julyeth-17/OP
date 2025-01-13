import { Component, ViewChild, ElementRef } from '@angular/core';
import { RegistroService } from 'src/app/services/registro.service'
import { EmailService } from 'src/app/services/email.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {

  visible: boolean = true;
  changetype: boolean = true;

  userFormLogin = {
    usuario: '',
    password: ''
  }
  regexAlfanum = /[a-zA-Z0-9_.]+$/

  constructor(private _registroService: RegistroService, private router: Router, private _emailService: EmailService) { }

  ingresoUsuario() {
    this._registroService.postIngresoUsuario(this.userFormLogin).subscribe(respuestaAPI => {
      sessionStorage.setItem('token', respuestaAPI.token);
      console.log(respuestaAPI);

      this.router.navigate(['/perfil-usuario'])
    }, erro => {
      Swal.fire({
        icon: 'error',
        title: 'Usuario y/o contraseña inválidos',
        iconColor: '#ff0d0d'
      })
    });
  }

  verpass() {
    this.visible = !this.visible
    this.changetype = !this.changetype
  }

  recordarPassword() {
    Swal.fire({
      title: '¿Olvidaste tu contraseña?',
      text: 'Ingresa tu correo:',
      input: 'email',
      confirmButtonText: 'Enviar',
      showCancelButton: true,
      preConfirm: (email) => {
        if (!email) {
          Swal.showValidationMessage('Por favor, ingresa un correo válido.');
          return;
        }
        return email;
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const email = result.value;
        this._emailService.recordarContrasena({
          to: email,
        }).subscribe({
          next: () => {
            Swal.fire(
              'Correo enviado',
              `Se ha enviado un correo a ${email} con las instrucciones para recuperar tu contraseña.`,
              'success'
            );
          },
          error: (err) => {
            console.error(err);
            Swal.fire(
              'No se pudo enviar el correo. Por favor, inténtalo de nuevo más tarde.',
            );
          }
        });
      }
    });
  }
}
