import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { lastValueFrom } from 'rxjs';
import { MasterCacheService } from 'src/app/api/cache/master-cache-service';
import { Client } from 'src/app/api/models/clinic/client';
import { Debt } from 'src/app/api/models/clinic/debt';
import { Coat } from 'src/app/api/models/master/coat';
import { Race } from 'src/app/api/models/master/race';
import { Sex } from 'src/app/api/models/master/sex';
import { Species } from 'src/app/api/models/master/species';
import { ClientsService } from 'src/app/api/services/clinic/clients.service';
import { NotificationService } from 'src/app/api/services/notification.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
})
export class ClienteComponent implements OnInit {
  clientes: any[] = [];
  loading = true;
  filtro: string = '';
  pageIndex = 1;
  pageSize = 10;
  totalResults = 0;
  totalPages = 0;
  visible = false;
  expandSet = new Set<number>();

  isVisible = false;
  isEdit = false;
  client: Client = new Client();

  petsSex: Sex[] = [];
  petsRace: Race[] = [];
  petsSpecies: Species[] = [];
  petsCoat: Coat[] = [];

  constructor(
    private clienteService: ClientsService,
    private router: Router,
    private notificationService: NotificationService,
    private masterCacheService: MasterCacheService
  ) {}

  async ngOnInit(): Promise<void> {
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
  }

  /**
   * Obtiene la lista de clientes
   */
  async listarClientes() {
    this.loading = true;
    this.clientes = [];
    const response = (await lastValueFrom(
      this.clienteService.findAllPagingClient({
        filter: this.filtro,
        page: this.pageIndex,
        pageSize: this.pageSize,
      })
    ).catch((error) => {
      this.clientes = [];
      this.totalResults = 0;
      this.totalPages = 0;
      this.loading = false;
    })) as any;

    if (response) {
      this.clientes = response.data;
      this.totalResults = response.total_resultados;
      this.totalPages = response.total_paginas > 0 ? response.total_paginas : 1;
      this.loading = false;
      console.log(this.clientes);
    }
  }

  /**
   * Se ejecuta con los cambios de la tabla
   * @param params
   */
  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort } = params;
    this.pageSize = pageSize;
    this.pageIndex = pageIndex;
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.listarClientes();
  }

  /**
   * Resetea el filtro de busqueda
   */
  reset(): void {
    this.filtro = '';
    this.search();
  }

  /**
   * Realiza la busqueda
   */
  search(): void {
    this.visible = false;
    this.pageIndex = 1;
    this.listarClientes();
  }

  /**
   * Muestra y oculta la informacion adicional
   * @param id
   * @param checked
   */
  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  /**
   * Comprueba si existe el nombre del cliente o la mascota en el filtro de palabras
   * @param cliente
   * @returns
   */
  checkFiltro(cliente: any): boolean {
    if (!this.filtro) {
      return false;
    }
    const palabras = this.filtro.split(',').map((p) => p.trim());
    // Si existe nombre de cliente y mascota
    if (palabras.length > 1 && cliente.mascotas) {
      for (const mascota of cliente.mascotas) {
        if (
          palabras.some(
            (p) =>
              mascota.nom.toLowerCase().includes(p.toLowerCase()) &&
              palabras.some((p) =>
                cliente.ayn.toLowerCase().includes(p.toLowerCase())
              )
          )
        ) {
          return true;
        }
      }
    } else {
      // Si solo existe nombre de mascota
      if (cliente.mascotas) {
        for (const mascota of cliente.mascotas) {
          if (mascota.nom.toLowerCase().includes(this.filtro.toLowerCase())) {
            return true;
          }
        }
      }
    }
    return false;
  }

  /**
   * Comprueba si existe el  nombre de la mascota en el filtro de palabras
   * @param mascota
   * @returns
   */
  checkFiltroMascota(mascota?: any): boolean {
    if (!this.filtro) {
      return false;
    }
    const palabrasClave = this.filtro.split(',').map((p) => p.trim());
    const mascotaNombre = mascota.nom.toLowerCase();
    return palabrasClave.some((p) => mascotaNombre.includes(p.toLowerCase()));
  }

  async clientDetail(id: string) {
    this.router.navigate(['dashboard/clients/detail', id]);
  }

  async petDetail(id: string) {
    this.router.navigate(['dashboard/clients/pets/history', id]);
  }

  async editClient(id: string) {
    this.client = (await lastValueFrom(
      this.clienteService.findOneClient({ id: id })
    )) as Client;
    this.showModal();
  }

  showModal(): void {
    this.isEdit = false;
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.client = new Client();
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

  countDebts(debts: any[]) {

    if (debts) {
      let value = 0;
      debts.forEach((debt) => {
        if (!debt.paid) {
          value += debt.quantity;
        }
      });
      return value.toString();
    }
    return null;
  }
}
