import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroService } from 'src/app/services/registro.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

    constructor (public _registroService: RegistroService, private _router: Router){ }

    cerrarSesion(){
        sessionStorage.removeItem('token');
        this._router.navigate(['/inicio-sesion']);
    }
}
