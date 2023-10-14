import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { PetHistoryService } from 'src/app/api/services/clinic/history.service';
import { PetHistory } from 'src/app/api/models/clinic/history';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-pet-history-form',
  templateUrl: './pet-history-form.component.html',
  styleUrls: ['./pet-history-form.component.css'],
})
export class PetHistoryFormComponent implements OnInit {
  @Input() isDetail: boolean = false;
  @Input() client: Client = new Client();

  @Output() updateClient = new EventEmitter<Client>();
  @Output() updatePetHistory = new EventEmitter<PetHistory>();

  @Input() pethistory: PetHistory = new PetHistory();
  @Input() pet: Pet = new Pet();

  submitted: boolean = false;


  compareFn = (o1: any, o2: any) => o1 && o2 ? o1.id === o2.id : o1 === o2;

  constructor(
    public masterCacheService: MasterCacheService,
    public service: PetHistoryService,
    public notificationService: NotificationService,
    private changeDetector: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {

    console.log(this.pet)
    console.log(this.client)

    this.pethistory = new PetHistory();
    this.pethistory.idm = this.pet.idm;
    this.pethistory.fec = Utils.transformDate(new Date().toUTCString(), 'yyyy-MM-dd', 'en-US')


    if (this.pethistory) {
      this.pethistory.fec = Utils.transformDate(this.pethistory.fec, 'yyyy-MM-dd', 'en-US');
    }
    this.changeDetector.detectChanges()




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
      this.pethistory = new PetHistory();
      this.notificationService.showSuccess('PET.HISTORY.SAVE.MESSAGE.OK');
      // Emit to client detail
      this.updateClient.emit(this.client);
    }
  }

  /**
   * Updates a pet
   */
  async update() {
    this.notificationService.showInfo('PET.HISTORY.UPDATE.MESSAGE.INFO');
    const result = await lastValueFrom(
      this.service.updatePetHistory({ id: this.pethistory._id, body: this.pethistory })
    ).catch((error) => {
      this.submitted = false;
      this.notificationService.showError('PET.HISTORY.UPDATE.MESSAGE.ERROR');
    });

    if (result) {
      this.notificationService.showSuccess('PET.HISTORY.UPDATE.MESSAGE.OK');
    }

    // Emit to pet history
    this.updatePetHistory.emit(this.pethistory);
  }




  onUpdate() {

  }


  handleChangeImage({ file, fileList }: NzUploadChangeParam): void {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      this.notificationService.showSuccess(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this.notificationService.showError(`${file.name} file upload failed.`);
    }
  }
}
