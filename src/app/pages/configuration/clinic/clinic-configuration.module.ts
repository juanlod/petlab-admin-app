import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicConfigurationComponent } from './clinic-configuration/clinic-configuration.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { NgZorroModule } from 'src/app/ng-zorro.module';
import { TranslationModule } from 'src/app/translation.module';
import { ProvinceComponent } from './provinces/provinces/provinces.component';
import { ProvincesFormComponent } from './provinces/provinces-form/provinces-form.component';
import { LocalityFormComponent } from './localities/localities-form/localities-form.component';
import { LocalityComponent } from './localities/localities/localities.component';
import { RacesFormComponent } from './races/races-form/races-form.component';
import { RaceComponent } from './races/races/races.component';
import { SpeciesFormComponent } from './species/species-form/species-form.component';
import { SpeciesComponent } from './species/species/species.component';
import { CoatComponent } from './coats/coats/coats.component';
import { CoatsFormComponent } from './coats/coats-form/coats-form.component';
import { SexComponent } from './sexes/sexes/sexes.component';
import { SexFormComponent } from './sexes/sexes-form/sexes-form.component';
import { ClinicImagesFormComponent } from './clinic-images/clinic-images-form/clinic-images-form.component';
import { ClinicImagesComponent } from './clinic-images/clinic-images/clinic-images.component';

@NgModule({
  declarations: [
    ClinicConfigurationComponent,
    ProvinceComponent,
    ProvincesFormComponent,
    LocalityFormComponent,
    LocalityComponent,
    SpeciesComponent,
    SpeciesFormComponent,
    RaceComponent,
    RacesFormComponent,
    CoatComponent,
    CoatsFormComponent,
    SexComponent,
    SexFormComponent,
    ClinicImagesComponent,
    ClinicImagesFormComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatTableModule,
    ReactiveFormsModule,
    NgZorroModule,
    MaterialModule,
    FormsModule,
    TranslationModule,
    AppRoutingModule,
    FontAwesomeModule,
    ToastrModule,
  ],
})
export class ClinicConfigurationModule {}
