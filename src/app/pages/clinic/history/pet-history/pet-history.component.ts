import {
  Component,
  HostListener,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';
import { Client } from 'src/app/api/models/clinic/client';
import { PetHistory } from 'src/app/api/models/clinic/history';
import { Pet } from 'src/app/api/models/clinic/pet';
import { ClientsService } from 'src/app/api/services/clinic/clients.service';
import { PetHistoryService } from 'src/app/api/services/clinic/history.service';
import { NotificationService } from 'src/app/api/services/notification.service';
import { WebSocketService } from 'src/app/api/services/websocket.service';
import { CommonComponent } from 'src/app/api/common/common.component';
import Swal from 'sweetalert2';
import { NzModalService } from 'ng-zorro-antd/modal';

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
export class PetHistoryComponent extends CommonComponent implements OnInit {

  @ViewChild('historyTemplate', { static: true })
  historyTemplate: TemplateRef<any>;

  @Input() pet = new Pet();
  @Input() client = new Client();

  public pethistory: any = new PetHistory();
  public isVisible: boolean = false;
  private isDeleting = false;

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
    private webSocketService: WebSocketService,
    private translateService: TranslateService,
    private notificationService: NotificationService,
    private modal: NzModalService
  ) {
    super();
  }

  async ngOnInit(): Promise<void> {
    // Suscríbete a los mensajes del WebSocket
    this.webSocketService.messages$.subscribe((message) => {
      if (message === `historySaved_${this.pet.idm}`) {
        // Si el evento es 'historySaved', recarga los historiales
        this.reloadHistory();
      }

      if (message === `historyDeleted_${this.pet.idm}`) {
        // Si el evento es 'historyDeleted', recarga los historiales
         this.reloadHistory();

      }
    });

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
   * Este metodo ejecuta una llamada al API para obtener un lote de historiales de mascotas.
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
   * Este metodo actualiza el estado del componente de manera inmutable.
   * @param newState Un objeto que contiene las propiedades del estado que se desean actualizar.
   */
  private setState(newState: Partial<ComponentState>): void {
    this.state = { ...this.state, ...newState };
  }


  /**
   * Carga mas elementos al hacer scroll
   * @param event
   */
  @HostListener('window:scroll', ['$event'])
  onTimelineScroll(event: any) {

    console.log('Scroll event:', event);
    if (this.isDeleting) {
      return;
    }

    const element = event.target.documentElement;
    const remainingHeight =
      element.scrollHeight - (element.scrollTop + element.clientHeight);
    if (remainingHeight < 20) {
      // ajustar este valor a tu necesidad
      this.loadMore();
    }
  }



  /**
   * Abre un nuevo modal
   */
  showModal(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.pethistory = new PetHistory();
    this.isVisible = true;
  }

  /**
   * Este metodo muestra un modal para editar el historial seleccionado.
   * @param history El historial seleccionado.
   */
  showEditModal(history: PetHistory, event: Event) {
    event.preventDefault();
    event.stopPropagation();

    this.pethistory = history;
    this.isVisible = true;
  }

  /**
   * Este metodo cierra el modal visible.
   */
  handleCancel(): void {
    this.isVisible = false;
  }

  /**
   * Este metodo se ejecuta cuando se actualiza el historial.
   * @param event El evento de actualización.
   */
  onUpdateHistory(event: any) {
    this.setState({
      loadedCount: 0,
      history: [],
      isLoading: false,
    });
    this.loadMore();

    // Emite el evento de actualizacion del historial del paciente
    this.webSocketService.send(`historySaved_${this.pet.idm}`);
  }

  /**
   * Este metodo verifica si la fecha del historial es la misma que la fecha actual.
   * @param historyDate La fecha del historial.
   * @returns Verdadero si la fecha del historial es hoy, falso en caso contrario.
   */
  historyToday(historyDate: string) {
    return this.transformDate(historyDate, 'dd-MM-yyyy', 'es-ES').includes(
      this.transformDate(this.today, 'dd-MM-yyyy', 'es-US')
    );
  }

  /**
   * Este metodo obtiene el tipo de item en la lista de historiales.
   * @param type El tipo del item.
   * @returns La plantilla de historial si el tipo es 'HISTORY', nulo en caso contrario.
   */
  getItemType(type: string) {
    if (type?.includes('HISTORY')) {
      return this.historyTemplate;
    }
    return null;
  }

  /**
   * Reinicia y recarga el historial del paciente
   */
  private reloadHistory(): void {
    this.setState({
      loadedCount: 0,
      history: [],
      isLoading: false,
    });
    this.loadMore();
  }

  /**
   * Remove a registry
   * @param registro
   */
  async delete(element: PetHistory, event: Event): Promise<void> {
    this.isDeleting = true;
    event.preventDefault();
    event.stopPropagation();

    const translationKeys = [
      'DELETE.CONFIRMATION_MESSAGE',
      'DELETE.CONFIRM_BUTTON',
      'DELETE.CANCEL_BUTTON',
    ];
    const translations = await this.translateService
      .get(translationKeys)
      .toPromise();

    // Swal.fire({
    //   heightAuto: false,
    //   title: '',
    //   text: translations['DELETE.CONFIRMATION_MESSAGE'],
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonText: translations['DELETE.CONFIRM_BUTTON'],
    //   cancelButtonText: translations['DELETE.CANCEL_BUTTON'],
    //   confirmButtonColor: '#22bb33',
    //   cancelButtonColor: '#bb2124',
    //   reverseButtons: true,
    // }).then((result) => {
    //   if (result.isConfirmed) {
      //  this.removePetHistory(element.idClinica);
    //   }
    // });

    this.confirmModal = this.modal.confirm({
      nzTitle: translations['DELETE.CONFIRMATION_MESSAGE'],
      nzCentered: true,
      nzOkDanger: true,
      nzWidth: '500px',
      nzIconType: 'warning',  // Mostrar el botón de cancelar
      nzOnOk: () =>
        this.removePetHistory(element?.idClinica)
    });
  }

  async removePetHistory(id: number) {
    await lastValueFrom(
      this.historyService.removePetHistory({ id: id })
    ).catch( error => {
      this.notificationService.showSuccess(`DELETE.MESSAGE.KO`)
    });
    this.notificationService.showSuccess(`DELETE.MESSAGE.OK`);
    // Emite el evento de actualizacion del historial del paciente
    this.webSocketService.send(`historyDeleted_${this.pet.idm}`);
  }
}
