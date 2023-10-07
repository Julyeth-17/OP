import { inject } from '@angular/core'
import { CanMatchFn } from '@angular/router';
import { RegistroService } from 'src/app/services/registro.service'

export const autenticacionGuard: CanMatchFn = (route, segments) => {

    const _registroService = inject(RegistroService)
    return _registroService.estaLogin()
};


