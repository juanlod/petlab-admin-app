import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { MasterCacheService } from 'src/app/api/cache/master-cache-service';
import { ClientsService } from 'src/app/api/services/clinic/clients.service';
import { Utils } from 'src/app/utils';
import { ClienteFormComponent } from '../client-form/cliente-form.component';
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
  public loading = true;
  public isVisible = false;

  public petsSex: Sex[] = [];
  public petsRace: Race[] = [];
  public petsSpecies: Species[] = [];
  public petsCoat: Coat[] = [];

  public searchValue = '';
  public visible = false;
  public listOfDisplayData: any[] = [];

  public isPetVisible = false;
  public isDebtVisible = false;
  public totalDebts: number = 0;
  public selectedDebt: Debt;
  public locale: string;
  public filtroMascota: string = '';
  public selectedClientMascotas = []; // almacena las mascotas del cliente seleccionado
  public originalClientMascotas = [];
  public paginatedMascotas = [];

  pageSize = 5; // Número de mascotas por página
  pageIndex = 1; // Página actual
  totalPets = 0; // Número total de mascotas

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

      if (this.client?.mascotas) {
        this.originalClientMascotas = [...this.client.mascotas];
        this.selectedClientMascotas = [...this.client.mascotas];
        this.totalPets = this.client?.mascotas?.length;
        this.paginateMascotas();
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

  searchPet() {
    if (this.filtroMascota) {
      this.selectedClientMascotas = this.originalClientMascotas.filter(
        (mascota) =>
          mascota.nom.toLowerCase().includes(this.filtroMascota.toLowerCase())
      );
    } else {
      this.selectedClientMascotas = [...this.originalClientMascotas];
    }

    // Llamar a paginar después de filtrar
    this.onPageChange(1);
  }

  paginateMascotas() {
    const start = (this.pageIndex - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedMascotas = this.selectedClientMascotas.slice(start, end);

    if (!this.filtroMascota) {
      this.totalPets = this.originalClientMascotas.length;
    } else {
      this.totalPets = this.paginatedMascotas.length;
    }
  }

  petsForCurrentPage() {
    return this.paginatedMascotas;
  }

  onPageChange(index: number) {
    this.pageIndex = index;
    this.paginateMascotas(); // Actualizar la lista paginada cuando se cambia de página
  }
}
