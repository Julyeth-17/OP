import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { RegistroComponent } from './component/registro/registro.component';
import { InicioSesionComponent } from './component/inicio-sesion/inicio-sesion.component';
import { IngresoPersonajeComponent } from './component/ingreso-personaje/ingreso-personaje.component';
import { ListaUsuariosComponent } from './component/admin/lista-usuarios/lista-usuarios.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'inicio-sesion', component: InicioSesionComponent},
    { path: 'ingreso-personaje', component: IngresoPersonajeComponent}, //url que quiero poner
    { path: 'admin/usuarios-registrados', component: ListaUsuariosComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
