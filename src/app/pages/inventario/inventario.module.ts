import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './productos-component/productos/productos.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProveedoresFormComponent } from '../configuration/store/store-providers/proveedores-form/proveedores-form.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LoteComponent } from './productos-component/lote-form-component/lote-form-component';
import { ProductosFormComponent } from './productos-component/productos-form/productos-form.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from 'src/app/material.module';
import { NgZorroModule } from 'src/app/ng-zorro.module';
import { TranslationModule } from 'src/app/translation.module';
import { ToastrModule } from 'ngx-toastr';
import { ProductosDetailComponent } from './productos-component/productos-detail/productos-detail.component';
import { ProveedoresComponent } from '../configuration/store/store-providers/proveedores/proveedores.component';

@NgModule({
  declarations: [
    ProductosComponent,
    ProveedoresComponent,
    ProveedoresFormComponent,
    ProductosDetailComponent,
    ProductosFormComponent,
    LoteComponent,
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
    ToastrModule

  ],
  providers: []
})
export class InventarioModule {}
