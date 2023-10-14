import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreConfigurationComponent } from './store-configuration/store-configuration.component';
import { ProductTypesComponent } from './product-types/product-types/product-types.component';
import { ProductTypesFormComponent } from './product-types/product-types-form/product-types-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { NgZorroModule } from 'src/app/ng-zorro.module';
import { TranslationModule } from 'src/app/translation.module';
import { UnityTypesFormComponent } from './unity-types/unity-types-form/unity-types-form.component';
import { UnityTypesComponent } from './unity-types/unity-types/unity-types.component';

@NgModule({
  declarations: [
    StoreConfigurationComponent,
    ProductTypesComponent,
    ProductTypesFormComponent,
    UnityTypesFormComponent,
    UnityTypesComponent
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
export class StoreConfigurationModule {}
