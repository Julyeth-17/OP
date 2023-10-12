import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { RegistroComponent } from './component/registro/registro.component';
import { InicioSesionComponent } from './component/inicio-sesion/inicio-sesion.component';
import { IngresoPersonajeComponent } from './component/ingreso-personaje/ingreso-personaje.component';
import { PerfilUsuarioComponent } from './component/perfil-usuario/perfil-usuario.component';
import { ListaUsuariosComponent } from './component/admin/lista-usuarios/lista-usuarios.component';
import { PaginaErrorComponent } from './component/pagina-error/pagina-error.component';
import { autenticacionGuard } from './guards/autenticacion.guard';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'inicio-sesion', component: InicioSesionComponent},
    { path: 'ingreso-personaje', component: IngresoPersonajeComponent}, //url que quiero poner
    { path: 'perfil-usuario', component: PerfilUsuarioComponent}, //
    { path: 'actualizar-personaje/:id', component: IngresoPersonajeComponent},
    { path: 'actualizar-usuario/:id', component: RegistroComponent},
    { path: 'admin/usuarios-registrados', canMatch:[autenticacionGuard], component: ListaUsuariosComponent},
    { path: '404', component: PaginaErrorComponent},
    { path: '**', redirectTo: '404', pathMatch: 'full'} // SIEMPRE TIENE QUE ESTAR AL FINAL
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
