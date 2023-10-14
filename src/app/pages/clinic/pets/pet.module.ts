import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NgZorroModule } from 'src/app/ng-zorro.module';
import { MaterialModule } from 'src/app/material.module';
import { TranslationModule } from 'src/app/translation.module';

import { PetFormComponent } from './detail/pet-form/pet-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { PetDetailComponent } from './detail/pet-detail/pet-detail.component';
import { PetHistoryComponent } from '../history/pet-history/pet-history.component';
import { PetHistoryFormComponent } from '../history/pet-history-form/pet-history-form.component';

@NgModule({
  declarations: [PetHistoryComponent, PetFormComponent, PetDetailComponent, PetHistoryFormComponent],
  imports: [
    CommonModule,
    NgZorroModule,
    MaterialModule,
    FormsModule,
    TranslationModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  exports: [PetFormComponent],
})
export class PetModule {}
