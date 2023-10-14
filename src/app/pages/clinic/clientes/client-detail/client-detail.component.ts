import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { MasterCacheService } from 'src/app/api/cache/master-cache-service';
import { ClientsService } from 'src/app/api/services/clinic/clients.service';
import { Utils } from 'src/app/utils';
import { ClienteFormComponent } from '../cliente-form/cliente-form.component';
import { NotificationService } from 'src/app/api/services/notification.service';
import { Coat } from 'src/app/api/models/master/coat';
import { Race } from 'src/app/api/models/master/race';
import { Sex } from 'src/app/api/models/master/sex';
import { Species } from 'src/app/api/models/master/species';
import { Debt } from 'src/app/api/models/clinic/debt';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css'],
})
export class ClientDetailComponent
  extends ClienteFormComponent
  implements OnInit
{
  loading = true;
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
  totalDebts: number = 0;
  selectedDebt: Debt;
  locale: string;

  constructor(
    clientService: ClientsService,
    masterCacheService: MasterCacheService,
    route: ActivatedRoute,
    notificationService: NotificationService,
    router: Router
  ) {
    super(
      clientService,
      masterCacheService,
      route,
      notificationService,
      router
    );
  }

  async ngAfterViewInit(): Promise<void> {
    this.locale = localStorage.getItem('lang')
      ? localStorage.getItem('lang')
      : 'es';

    const [petsSex, petsRace, petsSpecies, petsCoat] = await Promise.all([
      this.masterCacheService.getSex(),
      this.masterCacheService.getRace(),
      this.masterCacheService.getSpecies(),
      this.masterCacheService.getCoat(),
    ]);

    this.petsSex = petsSex;
    this.petsRace = petsRace;
    this.petsSpecies = petsSpecies;
    this.petsCoat = petsCoat;

    this.route.paramMap.subscribe(async (params) => {
      const id: string = params.get('id')!;

      if (id) {
        await this.getClient(id);
      }
    });
  }

  private async getClient(id: string) {
    this.client = await lastValueFrom(
      this.clientService.findOneClient({ id: id })
    );

    if (this.client) {
      this.client.feci = Utils.transformDate(
        this.client.feci,
        'dd-MM-yyyy',
        'en-US'
      );
      this.loading = false;
      this.listOfDisplayData = [...this.client?.mascotas];

      if (this.client.debts) {
        this.client.debts.forEach((debt) => {
          if (!debt.paid) {
            this.totalDebts += debt.quantity;
          }
        });
      }
    }
  }

  showModal(): void {
    this.isVisible = true;
  }

  showPetModal(): void {
    this.isPetVisible = true;
  }

  showDebtModal(debt?: Debt): void {
    this.isDebtVisible = true;
    this.selectedDebt = debt ? debt : new Debt();
  }

  handleCancel(): void {
    this.isVisible = false;
    this.isPetVisible = false;
    this.isDebtVisible = false;
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

  getPetCoat(id: number) {
    return id && id !== 0
      ? this.petsCoat.filter((coat) => coat.id === id)[0]?.nom
      : '';
  }

  getPetSpecieIcon(id: number) {
    return id && id !== 0
      ? this.petsSpecies.filter((specie) => specie.id === id)[0]?.icon
      : '';
  }

  async petDetail(id: string) {
    this.router.navigate(['dashboard/clients/pets/history', id]);
  }

  reset(): void {
    this.searchValue = '';
    this.search();
    this.listOfDisplayData = [...this.client.mascotas];
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfDisplayData.filter(
      (item: any) =>
        item.nom.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1
    );
  }

  /**
   * Suscribe update pets in pet form component
   * @param client
   */
  onUpdatePetClient(client: any) {
    // Update the pet list saved in the pet form modal
    this.getClient(this.client._id);
    this.isPetVisible = false;
  }
  /**
   *
   *
   * Suscribe to update client in client form component
   * @param client
   */
  onUpdateClient(client: any) {
    // Update the pet list saved in the pet form modal
    this.client = client;
    this.isVisible = false;
  }

  /**

   * Suscribe to update client in client form component
   * @param client
   */
  async onUpdateDebt(debt: any) {
    // Update the pet list saved in the pet form modal
    this.isDebtVisible = false;
    this.totalDebts = 0;
    await this.getClient(this.client._id);
  }
}
