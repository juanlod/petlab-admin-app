import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteComponent } from './client/cliente.component';
import { NgZorroModule } from '../../../ng-zorro.module';
import { MaterialModule } from '../../../material.module';
import { FormsModule } from '@angular/forms';
import { ClienteFormComponent } from './client-form/cliente-form.component';
import { TranslationModule } from 'src/app/translation.module';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PetModule } from '../pets/pet.module';
import { DebtFormComponent } from './debts-form/debts-form.component';


@NgModule({
  declarations: [
    ClienteComponent,
    ClienteFormComponent,
    ClientDetailComponent,
    DebtFormComponent
  ],
  imports: [
    CommonModule,
    NgZorroModule,
    MaterialModule,
    FormsModule,
    TranslationModule,
    AppRoutingModule,
    FontAwesomeModule,
    PetModule,

  ],
  exports: [
    ClienteFormComponent
  ]
})
export class ClienteModule { }
