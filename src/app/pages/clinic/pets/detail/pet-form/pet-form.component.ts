import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { MasterCacheService } from 'src/app/api/cache/master-cache-service';
import { Client } from 'src/app/api/models/clinic/client';
import { Coat } from 'src/app/api/models/master/coat';
import { Pet } from 'src/app/api/models/clinic/pet';
import { Race } from 'src/app/api/models/master/race';
import { Sex } from 'src/app/api/models/master/sex';
import { Species } from 'src/app/api/models/master/species';
import { NotificationService } from 'src/app/api/services/notification.service';
import { PetsService } from 'src/app/api/services/clinic/pets.service';
import { Utils } from 'src/app/utils';
import { CommonComponent } from 'src/app/api/common/common.component';

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.css'],
})
export class PetFormComponent extends CommonComponent implements OnInit {
  @Input() isDetail: boolean = false;
  @Input() client: Client = new Client();
  @Output() updateClient = new EventEmitter<Client>();
  @Output() updatePet = new EventEmitter<Pet>();

  @Input() pet: Pet = new Pet();

  submitted: boolean = false;
  petsSex: Sex[] = [];
  petsRace: Race[] = [];
  petsRaceBackup: Race[] = [];
  petsSpecies: Species[] = [];
  petsSpeciesBackup: Species[] = [];
  petsCoat: Coat[] = [];

  birthDate: string = '';
  deathDate: string = '';
  lastRevisionDate: string = '';

  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.id === o2.id : o1 === o2);

  constructor(
    public masterCacheService: MasterCacheService,
    public petService: PetsService,
    public notificationService: NotificationService,
    private changeDetector: ChangeDetectorRef
  ) {
    super();
  }

  async ngOnInit(): Promise<void> {
    const [petsSex, petsRace, petsSpecies, petsCoat] = await Promise.all([
      this.masterCacheService.getSex(),
      this.masterCacheService.getRace(),
      this.masterCacheService.getSpecies(),
      this.masterCacheService.getCoat(),
    ]);

    this.petsSex = petsSex;
    this.petsRace = petsRace;
    this.petsRaceBackup = [...petsRace];
    this.petsSpecies = petsSpecies;
    this.petsSpeciesBackup = [...petsSpecies];
    this.petsCoat = petsCoat;

    if (this.pet) {
      this.birthDate = Utils.transformDate(
        this.pet.fecn,
        'yyyy-MM-dd',
        'en-US'
      );
      this.lastRevisionDate = Utils.transformDate(
        this.pet.feci,
        'yyyy-MM-dd',
        'en-US'
      );
      this.deathDate = Utils.transformDate(
        this.pet.fecDec,
        'yyyy-MM-dd',
        'en-US'
      );
    }
    this.changeDetector.detectChanges();
  }

  /**
   * Save a pet
   * @returns
   */
  async save() {
    this.submitted = true;
    if (!this.pet.nom) {
      return;
    }
    this.notificationService.showInfo('PET.SAVE.MESSAGE.INFO');

    this.pet.idc = this.client.idc;
    this.pet.fecDec = this.deathDate;
    this.pet.fecn = this.birthDate;
    this.pet.feci = this.lastRevisionDate;

    const result = await lastValueFrom(
      this.petService.createPet({ body: this.pet })
    ).catch((error) => {
      this.submitted = false;
      this.notificationService.showError('PET.SAVE.MESSAGE.ERROR');
    });

    if (result) {
      this.client.mascotas.push(result);
      this.submitted = false;
      this.pet = new Pet();
      this.notificationService.showSuccess('PET.SAVE.MESSAGE.OK');
      // Emit to client detail
      this.updateClient.emit(this.client);
    }
  }

  /**
   * Updates a pet
   */
  async update() {
    this.notificationService.showInfo('PET.UPDATE.MESSAGE.INFO');

    this.pet.fecDec = this.deathDate;
    this.pet.fecn = this.birthDate;
    this.pet.feci = this.lastRevisionDate;

    const result = await lastValueFrom(
      this.petService.updatePet({ id: this.pet._id, body: this.pet })
    ).catch((error) => {
      this.submitted = false;
      this.notificationService.showError('PET.UPDATE.MESSAGE.ERROR');
    });

    if (result) {
      this.notificationService.showSuccess('PET.UPDATE.MESSAGE.OK');
    }

    // Emit to pet history
    this.updatePet.emit(this.pet);
  }

  /**
   * Change the race when the specie is modified
   */
  changeSpecies() {
    // this.petRaz = null;
    this.petsRace = this.pet.esp
      ? this.petsRaceBackup.filter((race) => race.esp === this.pet.esp)
      : Object.assign([], this.petsRaceBackup);
  }

  /**
   * Change the species if the race is modified
   */
  changeRace() {
    if (this.pet.raz) {
      const race = this.petsRace.find((s) => s.id === this.pet.raz);
      if (race) {
        this.pet.esp = race.esp;
      }
    }
  }
}
