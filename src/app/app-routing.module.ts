import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from './guards/admin.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ClienteComponent } from './pages/clinic/clients/client/cliente.component';
import { ClienteFormComponent } from './pages/clinic/clients/client-form/cliente-form.component';
import { ClientDetailComponent } from './pages/clinic/clients/client-detail/client-detail.component';
import { PetFormComponent } from './pages/clinic/pets/detail/pet-form/pet-form.component';
import { PetDetailComponent } from './pages/clinic/pets/detail/pet-detail/pet-detail.component';
import { ProductosComponent } from './pages/inventory/products-component/products/productos.component';
import { ProveedoresComponent } from './pages/configuration/store/store-providers/proveedores/proveedores.component';
import { ProductosFormComponent } from './pages/inventory/products-component/products-form/productos-form.component';
import { ProductosDetailComponent } from './pages/inventory/products-component/products-detail/productos-detail.component';
import { ClinicConfigurationComponent } from './pages/configuration/clinic/clinic-configuration/clinic-configuration.component';
import { StoreConfigurationComponent } from './pages/configuration/store/store-configuration/store-configuration.component';
import { ProductTypesComponent } from './pages/configuration/store/product-types/product-types/product-types.component';
import { UnityTypesComponent } from './pages/configuration/store/unity-types/unity-types/unity-types.component';
import { ProvinceComponent } from './pages/configuration/clinic/provinces/provinces/provinces.component';
import { LocalityComponent } from './pages/configuration/clinic/localities/localities/localities.component';
import { SpeciesComponent } from './pages/configuration/clinic/species/species/species.component';
import { RaceComponent } from './pages/configuration/clinic/races/races/races.component';
import { CoatComponent } from './pages/configuration/clinic/coats/coats/coats.component';
import { SexComponent } from './pages/configuration/clinic/sexes/sexes/sexes.component';
import { ClinicImagesComponent } from './pages/configuration/clinic/clinic-images/clinic-images/clinic-images.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard/clients', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: HomeComponent,
    canActivate: [AdminGuard],
    data: {
      roles: ['admin'],
    },
    children: [
      {
        path: 'clients',
        children: [
          { path: '', component: ClienteComponent },
          { path: 'form', component: ClienteFormComponent },
          { path: 'form/:id', component: ClienteFormComponent },
          { path: 'detail/:id', component: ClientDetailComponent },
          {
            path: 'pets',
            children: [
              { path: 'form', component: PetFormComponent },
              { path: 'form/:id', component: PetFormComponent },
              { path: 'history/:id', component: PetDetailComponent },
            ],
          },
        ],
      },
      {
        path: 'inventory',
        children:[
          { path: 'products', component: ProductosComponent },
          { path: 'products/form', component: ProductosFormComponent },
          { path: 'products/form/:id', component: ProductosFormComponent },
          { path: 'products/detail/:id', component: ProductosDetailComponent },
        ]
      },
      {
        path: 'configuration',
        children:[
          { path: 'clinic', component: ClinicConfigurationComponent },
          { path: 'clinic/images', component: ClinicImagesComponent },
          { path: 'clinic/provinces', component: ProvinceComponent },
          { path: 'clinic/localities', component: LocalityComponent },
          { path: 'clinic/species', component: SpeciesComponent },
          { path: 'clinic/races', component: RaceComponent },
          { path: 'clinic/coats', component: CoatComponent },
          { path: 'clinic/sexes', component: SexComponent },
          { path: 'store', component: StoreConfigurationComponent },
          { path: 'store/providers', component: ProveedoresComponent },
          { path: 'store/product_types', component: ProductTypesComponent },
          { path: 'store/unity_types', component: UnityTypesComponent },
        ]
      }
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],

  exports: [RouterModule],
})
export class AppRoutingModule {}
