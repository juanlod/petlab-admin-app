import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClinicConfigurationModule } from './clinic/clinic-configuration.module';
import { StoreConfigurationModule } from './store/store-configuration.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ClinicConfigurationModule, StoreConfigurationModule],
})
export class ConfigurationModule {}
