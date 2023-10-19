import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CommonModule, registerLocaleData } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { LoginComponent } from './components/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './components/home/home.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NgZorroModule } from './ng-zorro.module';
import { MaterialModule } from './material.module';
import { ClienteModule } from './pages/clinic/clientes/cliente.module';

import es from '@angular/common/locales/es';
import en from '@angular/common/locales/en';
import gl from '@angular/common/locales/gl';

import { es_ES, NZ_I18N, gl_ES, en_GB } from 'ng-zorro-antd/i18n';
import { TranslationModule } from './translation.module';
import { PetModule } from './pages/clinic/pets/pet.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InventarioModule } from './pages/inventario/inventario.module';
import { ConfigurationModule } from './pages/configuration/configuration.module';
// import { NzConfig, provideNzConfig } from 'ng-zorro-antd/core/config';

registerLocaleData(es);
registerLocaleData(en);
registerLocaleData(gl);

// const ngZorroConfig: NzConfig = {
//   message: { nzTop: 120 },
//   notification: { nzTop: 240 }
// };


@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    ToastrModule.forRoot(),
    NzFormModule,
    NzButtonModule,
    ReactiveFormsModule,
    NgZorroModule,
    MaterialModule,
    NgbModule,
    ClienteModule,
    TranslationModule,
    PetModule,
    FontAwesomeModule,
    InventarioModule,
    ConfigurationModule,
  ],
  exports: [],
  providers: [{ provide: NZ_I18N, useValue: [es_ES, en_GB, gl_ES] },
    // provideNzConfig(ngZorroConfig)
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
