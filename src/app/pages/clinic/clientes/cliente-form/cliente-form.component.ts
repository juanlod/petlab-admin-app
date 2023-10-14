import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { lastValueFrom, of } from 'rxjs';

import { MasterCacheService } from '../../../../api/cache/master-cache-service';
import { ClientsService } from 'src/app/api/services/clinic/clients.service';
import { Client } from 'src/app/api/models/clinic/client';
import { Province } from 'src/app/api/models/master/province';
import { Locality } from 'src/app/api/models/master/locality';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { Utils } from 'src/app/utils';
import { NotificationService } from 'src/app/api/services/notification.service';


@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css'],
})
export class ClienteFormComponent implements OnInit {
  @Input() isEdit: boolean = false;
  @Input() isDetail: boolean = false;
  @Input() client: Client = new Client();
  @Output() clientEmmiter = new EventEmitter<Client>();

  provinces: Province[] = [];
  provincesBackup: Province[] = [];
  localities: Locality[] = [];
  localitiesBackup: Locality[] = [];

  mapLocalityWithProvince: any;
  emailExist: boolean = false;
  identifExist: boolean = false;
  submitted: boolean = false;
  editing = false;

  constructor(
    public clientService: ClientsService,
    public masterCacheService: MasterCacheService,
    public route: ActivatedRoute,
    public notificationService: NotificationService,
    public router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const [provinces, localities] = await Promise.all([
      this.masterCacheService.getProvinces(),
      this.masterCacheService.getLocalities(),
    ]);

    this.provinces = provinces;
    this.localities = localities;
    this.mapLocalitiesProvinces();

    this.route.paramMap.subscribe(async (params) => {
      const id: string = params.get('id')!;

      if (id) {
        this.client = await lastValueFrom(
          this.clientService.findOneClient({ id: id })
        );
        if (this.client) {
          this.client.feci = Utils.transformDate(
            this.client.feci,
            'yyyy-MM-dd',
            'en-US'
          );
        } else {
          this.client = new Client();
        }
      }
    });
  }

  /**
   * Save a client
   * @returns client
   */
  async saveClient() {
    this.emailExist = false;
    this.identifExist = false;
    this.submitted = true;

    //  Validate if client identif is in use
    if (this.client.Identif) {
      this.identifExist = await lastValueFrom(
        this.clientService.findByIdentifClient({ identif: this.client.Identif })
      );
    }

    // Validate if the client email is in use
    if (this.client.email && !environment.emails.includes(this.client.email)) {
      this.emailExist = await lastValueFrom(
        this.clientService.findByEmailClient({ email: this.client.email })
      );
    }

    if (this.emailExist || this.identifExist || !this.client.ayn) {
      return;
    }

    this.notificationService.showInfo('CLIENT.SAVE.MESSAGE.INFO');
    // Wait to save a client
    const result = (await lastValueFrom(
      this.clientService.createClient({ body: this.client })
    ).catch((error: any) => {
      this.submitted = false;
      this.notificationService.showError('CLIENT.SAVE.MESSAGE.ERROR');
    })) as any;

    if (result) {
      this.client = result;
      this.submitted = false;
      history.replaceState(
        null,
        '',
        `/#/dashboard/clientes/form/${this.client._id}`
      );
      this.notificationService.showSuccess('CLIENT.SAVE.MESSAGE.OK');

      if (!this.isDetail) {
        this.router.navigate(['dashboard/clients/detail', this.client._id]);
      }
    }


  }

  /**
   * Update a client
   */
  async updateClient() {
    this.notificationService.showInfo('CLIENT.UPDATE.MESSAGE.INFO');
    const result = (await lastValueFrom(
      this.clientService.updateClient({
        id: this.client._id,
        body: this.client,
      })
    ).catch((error: any) => {
      this.submitted = false;
      this.notificationService.showError('CLIENT.UPDATE.MESSAGE.ERROR');
    })) as any;

    if (result) {
      this.notificationService.showSuccess('CLIENT.UPDATE.MESSAGE.OK');
    }
    this.clientEmmiter.emit(this.client);
  }

  /**
   * Set id province to locality
   */
  async mapLocalitiesProvinces() {
    if (this.localities?.length > 0 && this.provinces?.length > 0) {
      this.localities = this.localities.map((locality) => {
        const province = this.provinces.find(
          (prov) => prov.id === locality.dep
        );
        return {
          ...locality,
          province: province ? province.id : 0,
        };
      });

      this.localitiesBackup = Object.assign([], this.localities);
    }
  }

  /**
   * Cambia la localidad segun la provincia seleccionada
   */
  changeLocalities() {
    this.client.Loc = null;
    this.client.codp = null;
    this.localities = this.client.Dep
      ? this.localitiesBackup.filter(
          (locality) => locality.province === this.client.Dep
        )
      : Object.assign([], this.localitiesBackup);
  }

  /**
   * Establece el valor de la provincia a partir de la localidad seleccionada
   */
  changeProvince() {
    this.client.codp = null;

    if (this.client.Loc) {
      const localidad = this.localities.find((l) => l.id === this.client.Loc);
      this.client.Dep = localidad.province;
      this.client.codp = localidad.cp;
    }
  }

  /**
   * Gets the province name
   * @param provinceId
   * @returns
   */
  getProvinceName(provinceId: number): string {
    if (provinceId) {
      const province = this.provinces.find((p) => p.id === provinceId);
      return province ? province.nom : '';
    }
    return null;
  }
  /**
   * Gets the province name
   * @param provinceId
   * @returns
   */
  getLocalityName(localityId: number): string {
    if (localityId) {
      const locality = this.localities.find((p) => p.id === localityId);
      return locality ? locality.nom : '';
    }
    return null;
  }
}
