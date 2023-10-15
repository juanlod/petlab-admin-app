import {
  Component,
  HostListener,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Client } from 'src/app/api/models/clinic/client';
import { PetHistory } from 'src/app/api/models/clinic/history';
import { Pet } from 'src/app/api/models/clinic/pet';
import { ClientsService } from 'src/app/api/services/clinic/clients.service';
import { PetHistoryService } from 'src/app/api/services/clinic/history.service';
import { WebSocketService } from 'src/app/api/services/websocket.service';
import { Utils } from 'src/app/utils';

interface ComponentState {
  history: any[];
  loadedCount: number;
  countPerPage: number;
  isLoading: boolean;
  errorMessage: string;
  hasMoreData: boolean;
}

@Component({
  selector: 'app-pet-history',
  templateUrl: './pet-history.component.html',
  styleUrls: ['./pet-history.component.css'],
})
export class PetHistoryComponent implements OnInit {
  @ViewChild('historyTemplate', { static: true })
  historyTemplate: TemplateRef<any>;

  @Input() pet = new Pet();
  @Input() client = new Client();

  public today: string = new Date().toUTCString();

  public pethistory: any = null;
  public isVisible: boolean = false;

  public state: ComponentState = {
    history: [],
    loadedCount: 0,
    countPerPage: 20,
    isLoading: false,
    errorMessage: '',
    hasMoreData: true,
  };

  constructor(
    private historyService: PetHistoryService,
    private clientService: ClientsService,
    private webSocketService: WebSocketService
  ) {}

  async ngOnInit(): Promise<void> {

    // Suscríbete a los mensajes del WebSocket
    this.webSocketService.messages$.subscribe(
      message => {
        console.log('Received message from server:', message);
        if (message.event === 'historySaved') {
          // Si el evento es 'historySaved', recarga los historiales
          this.reloadHistory();
        }
      }
    );

    this.loadMore();
    this.client = await lastValueFrom(
      this.clientService.findOneByIdcClient({ id: this.pet.idc })
    );
  }

  /**
   * Carga los datos pendientes de 20 en 20
   * @returns
   */
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
        errorMessage: '',
        hasMoreData: nextBatch.length > 0,
      });
    } catch (error) {
      this.setState({
        errorMessage: 'Failed to load pet history',
        isLoading: false,
      });
    }
  }

  /**
   * Este método ejecuta una llamada al API para obtener un lote de historiales de mascotas.
   * @returns Una promesa que resuelve a una lista de historiales de mascotas.
   */
  private async fetchHistoryBatch(): Promise<PetHistory[]> {
    const params = {
      idm: this.pet.idm,
      loadedCount: this.state.loadedCount,
      countPerPage: this.state.countPerPage,
    };

    return (await lastValueFrom(
      this.historyService.findByIdm({
        id: params.idm,
        skip: params.countPerPage,
        loadedCount: params.loadedCount,
      })
    )) as any;
  }

  /**
   * Este método actualiza el estado del componente de manera inmutable.
   * @param newState Un objeto que contiene las propiedades del estado que se desean actualizar.
   */
  private setState(newState: Partial<ComponentState>): void {
    this.state = { ...this.state, ...newState };
  }

  @HostListener('window:scroll', ['$event'])
  onTimelineScroll(event: any) {
    const element = event.target.documentElement;
    const remainingHeight =
      element.scrollHeight - (element.scrollTop + element.clientHeight);
    if (remainingHeight < 20) {
      // ajustar este valor a tu necesidad
      this.loadMore();
    }
  }

  transformDate(date: string) {
    return Utils.transformDate(date, 'dd-MM-yyyy', 'en-US');
  }

  showModal(): void {
    this.pethistory = new PetHistory();
    this.isVisible = true;
  }

  /**
   * Este método muestra un modal para editar el historial seleccionado.
   * @param history El historial seleccionado.
   */
  showEditModal(history: PetHistory) {
    this.pethistory = history;
    this.isVisible = true;
  }

  /**
   * Este método cierra el modal visible.
   */
  handleCancel(): void {
    this.isVisible = false;
  }

  /**
   * Este método se ejecuta cuando se actualiza el historial.
   * @param event El evento de actualización.
   */
  onUpdateHistory(event: any) {
    this.setState({
      loadedCount: 0,
      history: [],
      isLoading: false,
    });
    this.loadMore();
  }

  /**
   * Este método verifica si la fecha del historial es la misma que la fecha actual.
   * @param historyDate La fecha del historial.
   * @returns Verdadero si la fecha del historial es hoy, falso en caso contrario.
   */
  historyToday(historyDate: string) {
    return this.transformDate(historyDate).includes(
      this.transformDate(this.today)
    );
  }

  /**
   * Este método obtiene el tipo de item en la lista de historiales.
   * @param type El tipo del item.
   * @returns La plantilla de historial si el tipo es 'HISTORY', nulo en caso contrario.
   */
  getItemType(type: string) {
    if (type?.includes('HISTORY')) {
      return this.historyTemplate;
    }
    return null;
  }

  private reloadHistory(): void {
    this.setState({
      loadedCount: 0,
      history: [],
      isLoading: false,
    });
    this.loadMore();
  }
}
