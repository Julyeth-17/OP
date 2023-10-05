import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomeComponent } from './component/home/home.component';
import { RegistroComponent } from './component/registro/registro.component';
import { InicioSesionComponent } from './component/inicio-sesion/inicio-sesion.component';
import { HttpClientModule} from "@angular/common/http";
import { IngresoPersonajeComponent } from './component/ingreso-personaje/ingreso-personaje.component';
import { ListaUsuariosComponent } from './component/admin/lista-usuarios/lista-usuarios.component';
import { PaginaErrorComponent } from './component/pagina-error/pagina-error.component';
import { PerfilUsuarioComponent } from './component/perfil-usuario/perfil-usuario.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        FooterComponent,
        HomeComponent,
        RegistroComponent,
        InicioSesionComponent,
        IngresoPersonajeComponent,
        ListaUsuariosComponent,
        PaginaErrorComponent,
        PerfilUsuarioComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
