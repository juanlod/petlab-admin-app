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
import { Pet } from 'src/app/api/models/clinic/pet';
import { NotificationService } from 'src/app/api/services/notification.service';
import { PetHistoryService } from 'src/app/api/services/clinic/history.service';
import { PetHistory } from 'src/app/api/models/clinic/history';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { WebSocketService } from 'src/app/api/services/websocket.service';
import { diff_match_patch } from 'diff-match-patch';
import { TranslateService } from '@ngx-translate/core';
import { CommonComponent } from 'src/app/api/common/common.component';

@Component({
  selector: 'app-pet-history-form',
  templateUrl: './pet-history-form.component.html',
  styleUrls: ['./pet-history-form.component.css'],
})
export class PetHistoryFormComponent extends CommonComponent implements OnInit {
  @Input() isDetail: boolean = false;
  @Input() client: Client = new Client();
  @Output() updatePetHistory = new EventEmitter<PetHistory>();
  @Input() pethistory: PetHistory = new PetHistory();
  @Input() pet: Pet = new Pet();

  public originalPethistory: PetHistory;
  public submitted: boolean = false;

  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.id === o2.id : o1 === o2);

  constructor(
    public masterCacheService: MasterCacheService,
    public service: PetHistoryService,
    public notificationService: NotificationService,
    private changeDetector: ChangeDetectorRef,
    private websocketService: WebSocketService,
    private translateService: TranslateService
  ) {
    super();
  }

  async ngOnInit(): Promise<void> {


     // Nos suscribimos a los mensajes del WebSocket para actualizar los campos en tiempo real
    this.websocketService.textInput$.subscribe((data) => {
      if (data.idClinica === this.pethistory.idClinica) {
        if (data.field === 'consultationReason') {
          this.pethistory.consultationReason = data.value;
        } else if (data.field === 'cli') {
          this.pethistory.cli = data.value;
        }
      }
    });

    // Nos suscribimos al guardado de la historia clinica del WebSocket para actualizar la lista en tiempo real
    this.websocketService.messages$.subscribe((message) => {
      if (message === `historySaved_${this.pet.idm}`) {
        // Si el evento es 'historySaved', recarga los historiales
        this.loadPetHistory();

      }
    });

    // Si tiene id se formatea la fecha para mostrar en el campo
    if (this.pethistory?._id) {
      this.pethistory.fec = this.transformDate(
        this.pethistory.fec,
        'yyyy-MM-dd',
        'es-ES'
      );
    } else {
      // Si no tiene id se busca por fecha por si se inicia uno nuevo y ya existe
      const date = this.transformDate(
        new Date().toISOString(),
        'yyyy-MM-dd',
        'es-ES'
      );
      const result = await lastValueFrom(
        this.service.findByDatePetHistory({ date: date })
      );

      // Si no hay ninguno para esa fecha se inicializa un nuevo historial
      if (!result) {
        this.pethistory = new PetHistory();
        this.pethistory.idm = this.pet.idm;
        this.pethistory.fec = date;
        this.pethistory.type = 'HISTORY';

        // Se establece el mensaje inicial con la fecha del paciente
        if (!this.pet.fecn) {
          this.translateService
            .get('PET.DETAIL.BIRTHDAY.UNAVAILABLE')
            .subscribe((res: string) => {
              this.pethistory.cli = res;
            });
        }

        // Se guarda
        this.save();
      } else {
        // Si existe por fecha se formatea la fecha
        this.pethistory = result;
        this.pethistory.fec = date;
      }
    }
    this.originalPethistory = { ...this.pethistory };
    this.changeDetector.detectChanges();
  }

  /**
   * Carga los historiales de la mascota
   */
  private async loadPetHistory() {

    if (this.pethistory?.idClinica) {
      this.pethistory = await lastValueFrom(
        this.service.findByCLinicIdPetHistory({
          id: this.originalPethistory.idClinica,
        })
      );

      const date = this.transformDate(
        this.originalPethistory?.fec,
        'yyyy-MM-dd',
        'es-ES'
      );

      if (date && this.pethistory?.fec) {
        this.pethistory.fec = date;
      }

      // Copia los valores y busca las diferencias
      this.originalPethistory = { ...this.pethistory };
      this.hasDifferences('consultationReason');
      this.hasDifferences('cli');
    }
  }

  /**
   * Save a pet
   * @returns
   */
  async save() {
    this.submitted = true;
    if (!this.pethistory.cli) {
      return;
    }
    this.notificationService.showInfo('PET.HISTORY.SAVE.MESSAGE.INFO');

    const result = await lastValueFrom(
      this.service.createPetHistory({ body: this.pethistory })
    ).catch((error) => {
      this.submitted = false;
      this.notificationService.showError('PET.HISTORY.SAVE.MESSAGE.ERROR');
    });

    if (result) {
      this.submitted = false;
      this.notificationService.showSuccess('PET.HISTORY.SAVE.MESSAGE.OK');
      // Se igualan las variables para que se reinicien las comparativas
      this.pethistory = result;
      this.originalPethistory = { ...this.pethistory };
      this.updatePetHistory.emit(this.pethistory);
    }
  }

  /**
   * Updates a pet
   */
  async update() {
    this.notificationService.showInfo('PET.HISTORY.UPDATE.MESSAGE.INFO');
    const result = await lastValueFrom(
      this.service.updatePetHistory({
        id: this.pethistory._id,
        body: this.pethistory,
      })
    ).catch((error) => {
      this.submitted = false;
      this.notificationService.showError('PET.HISTORY.UPDATE.MESSAGE.ERROR');
    });

    if (result) {
      this.notificationService.showSuccess('PET.HISTORY.UPDATE.MESSAGE.OK');
      this.originalPethistory = { ...this.pethistory }; // Resetear originalPethistory
    }

    // Emit to pet history
    this.updatePetHistory.emit(this.pethistory);
  }

  /**
   * Sube imagenes a google drive
   * @param param0
   */
  handleChangeImage({ file, fileList }: NzUploadChangeParam): void {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      this.notificationService.showSuccess(
        `${file.name} file uploaded successfully.`
      );
    } else if (status === 'error') {
      this.notificationService.showError(`${file.name} file upload failed.`);
    }
  }

  /**
   * Emite la escritura en los campos para ver los valores en tiempo real
   * @param event
   * @param field
   */
  onTextInput(event: Event, field: string): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;

    // Envía el valor actual del texto, el campo, y el idClinica al servidor
    this.hasDifferences(field);
    this.websocketService.send({
      event: 'text-input',
      field,
      value,
      idClinica: this.pethistory.idClinica,
    });
  }

  hasDifferences(field: string): boolean {
    return this.originalPethistory && this.pethistory
      ? this.originalPethistory[field] !== this.pethistory[field]
      : false;
  }
}
