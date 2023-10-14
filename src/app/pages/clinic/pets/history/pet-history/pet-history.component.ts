import { Component, HostListener, Input, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Client } from 'src/app/api/models/clinic/client';
import { PetHistory } from 'src/app/api/models/clinic/history';
import { Pet } from 'src/app/api/models/clinic/pet';
import { ClientsService } from 'src/app/api/services/clinic/clients.service';
import { PetHistoryService } from 'src/app/api/services/clinic/history.service';
import { Utils } from 'src/app/utils';

interface ComponentState {
  history: PetHistory[];
  loadedCount: number;
  countPerPage: number;
  isLoading: boolean;
  errorMessage: string;
}

@Component({
  selector: 'app-pet-history',
  templateUrl: './pet-history.component.html',
  styleUrls: ['./pet-history.component.css'],
})
export class PetHistoryComponent implements OnInit {
  // Buscar cli

  @Input() pet = new Pet();
  @Input() client = new Client();

  public pethistory = null;
  public isVisible: boolean = false;

  public state: ComponentState = {
    history: [],
    loadedCount: 0,
    countPerPage: 20,
    isLoading: false,
    errorMessage: ''
  };


  constructor(private historyService: PetHistoryService, private clientService: ClientsService) {}

  async ngOnInit(): Promise<void> {
    this.loadMore()

    this.client = await lastValueFrom(this.clientService.findOneByIdcClient({id: this.pet.idc}))
    console.log(this.client)
  }

  public async loadMore(): Promise<void> {
    if (this.state.isLoading) {
      return;
    }

    this.setState({ isLoading: true });

    try {
      const nextBatch = await this.fetchHistoryBatch();
      this.setState({
        history: [...this.state.history, ...nextBatch],
        loadedCount: this.state.loadedCount + nextBatch.length,
        isLoading: false,
        errorMessage: ''
      });
    } catch (error) {
      this.setState({ errorMessage: 'Failed to load pet history', isLoading: false });
    }
  }

  private async fetchHistoryBatch(): Promise<PetHistory[]> {
    const params = {
      idm: this.pet.idm,
      loadedCount: this.state.loadedCount,
      countPerPage: this.state.countPerPage
    };

    return await lastValueFrom(this.historyService.findByIdm({id: params.idm, skip: params.countPerPage,
      loadedCount: params.loadedCount})) as any;
  }

  private setState(newState: Partial<ComponentState>): void {
    this.state = { ...this.state, ...newState };
  }


  @HostListener('window:scroll', ['$event'])
  onTimelineScroll(event: any) {
    const element = event.target.documentElement;
    const remainingHeight = element.scrollHeight - (element.scrollTop + element.clientHeight);
    if (remainingHeight < 20) { // ajustar este valor a tu necesidad
      this.loadMore();
    }
  }


  transformDate(date: string) {
    return Utils.transformDate(
      date,
      'dd-MM-yyyy',
      'en-US'
    );
  }


  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }


  onUpdateHistory(event:any) {

  }
}
