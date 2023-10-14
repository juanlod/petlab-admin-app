import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Client } from 'src/app/api/models/clinic/client';
import { Pet } from 'src/app/api/models/clinic/pet';
import { ClientsService } from 'src/app/api/services/clinic/clients.service';
import { NotificationService } from 'src/app/api/services/notification.service';
import { PetsService } from 'src/app/api/services/clinic/pets.service';
import { MasterCacheService } from 'src/app/api/cache/master-cache-service';
import { Coat } from 'src/app/api/models/master/coat';
import { Race } from 'src/app/api/models/master/race';
import { Sex } from 'src/app/api/models/master/sex';
import { Species } from 'src/app/api/models/master/species';
import { NzTabPosition } from 'ng-zorro-antd/tabs';
import { Utils } from 'src/app/utils';
import { Locality } from 'src/app/api/models/master/locality';
import { Province } from 'src/app/api/models/master/province';

@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.component.html',
  styleUrls: ['./pet-detail.component.css'],
})
export class PetDetailComponent implements OnInit {
  loading: boolean = false;
  fileList: any[] = [];
  pet: Pet = new Pet();
  client: Client = new Client();

  isVisible = false;

  petsSex: Sex[] = [];
  petsRace: Race[] = [];
  petsSpecies: Species[] = [];
  petsCoat: Coat[] = [];

  searchValue = '';
  visible = false;
  listOfDisplayData: any[] = [];

  isPetVisible = false;
  isDebtVisible = false;
  nzTabPosition: NzTabPosition = 'left';

  birthDate: string = '';
  deathDate: string = '';
  lastRevisionDate: string = '';

  provinces: Province[] = [];
  localities: Locality[] = [];

  constructor(
    private petService: PetsService,
    private clientService: ClientsService,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private router: Router,
    private masterCacheService: MasterCacheService,
  ) {
  }

  async ngOnInit(): Promise<void> {
    // Load master data
    const [petsSex, petsRace, petsSpecies, petsCoat, provinces, localities] =
      await Promise.all([
        this.masterCacheService.getSex(),
        this.masterCacheService.getRace(),
        this.masterCacheService.getSpecies(),
        this.masterCacheService.getCoat(),
        this.masterCacheService.getProvinces(),
        this.masterCacheService.getLocalities(),
      ]);

    this.petsSex = petsSex;
    this.petsRace = petsRace;
    this.petsSpecies = petsSpecies;
    this.petsCoat = petsCoat;
    this.provinces = provinces;
    this.localities = localities;


    this.route.paramMap.subscribe(async (params) => {
      const id: string = params.get('id')!;

      if (id) {
        this.pet = await lastValueFrom(this.petService.findOnePet({ id: id }));
        this.client = await lastValueFrom(
          this.clientService.findOneByIdcClient({ id: this.pet.idc })
        );

        this.birthDate = Utils.transformDate(
          this.pet.fecn,
          'dd-MM-yyyy',
          'en-US'
        );
        this.lastRevisionDate = Utils.transformDate(
          this.pet.feci,
          'dd-MM-yyyy',
          'en-US'
        );
        this.deathDate = Utils.transformDate(
          this.pet.fecDec,
          'dd-MM-yyyy',
          'en-US'
        );
        this.loading = false;
      }
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  showPetModal(): void {
    this.isPetVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.isPetVisible = false;
  }

  log(args: any[]): void {
    console.log(args);
  }

  getPetSex(id: number) {
    return id && id !== 0
      ? this.petsSex.filter((sex) => sex.ids === id)[0]?.value
      : '';
  }

  getPetRace(id: number) {
    return id && id !== 0
      ? this.petsRace.filter((race) => race.id === id)[0]?.nom
      : '';
  }

  getPetSpecie(id: number) {
    return id && id !== 0
      ? this.petsSpecies.filter((specie) => specie.id === id)[0]?.nom
      : '';
  }

  getPetSpecieIcon(id: number) {
    return id && id !== 0
      ? this.petsSpecies.filter((specie) => specie.id === id)[0]?.icon
      : '';
  }

  getPetCoat(id: number) {
    return id && id !== 0
      ? this.petsCoat.filter((coat) => coat.id === id)[0]?.nom
      : '';
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

  async petDetail(id: string) {
    this.router.navigate(['dashboard/clients/pets/history', id]);
  }

  /**
   * Suscribe update pets in pet form component
   * @param client
   */
  onUpdatePet(pet: any) {
    // Update the pet list saved in the pet form modal
    this.pet = pet;
    this.birthDate = Utils.transformDate(this.pet.fecn, 'dd-MM-yyyy', 'en-US');
    this.lastRevisionDate = Utils.transformDate(
      this.pet.feci,
      'dd-MM-yyyy',
      'en-US'
    );
    this.deathDate = Utils.transformDate(
      this.pet.fecDec,
      'dd-MM-yyyy',
      'en-US'
    );
    this.isPetVisible = false;
  }
}
