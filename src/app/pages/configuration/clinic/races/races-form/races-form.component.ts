import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';


import { NotificationService } from 'src/app/api/services/notification.service';
import { lastValueFrom } from 'rxjs';
import { RaceService } from 'src/app/api/services/master/race.service';
import { Race } from 'src/app/api/models/master/race';
import { Species } from 'src/app/api/models/master/species';




@Component({
  selector: 'app-races-form',
  templateUrl: './races-form.component.html',
  styleUrls: ['./races-form.component.css'],
})
export class RacesFormComponent implements OnInit {

  @Output() raceEvent = new EventEmitter<object>();
  @Input() species: Species[] = [];
  @Input() race = new Race();
  @Input() raceEdit: Race = new Race();

  // SELECT DE COMBOS
  submitted: boolean = false;

  constructor(
    public raceService: RaceService,
    private notificationService: NotificationService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.raceEdit = Object.assign({}, this.race);
  }

  /**
   * Guarda y actualiza un race
   */
  async saveProvider(): Promise<void> {
    this.submitted = true;

    if (!this.raceEdit.nom) {
      return;
    }
    this.notificationService.showInfo('RACE.SAVE.MESSAGE.INFO');
    const result = await lastValueFrom(
      this.raceService.createRace({ body: this.raceEdit })
    ).catch((error) => {
      this.notificationService.showError(`RACE.SAVE.MESSAGE.ERROR`);
    });
    if (result) {
      this.raceEvent.emit(this.raceEdit);
      this.notificationService.showSuccess(`RACE.SAVE.MESSAGE.OK`);
    }
  }

  async updateProvider(): Promise<void> {
    // Actualiza un race

    this.notificationService.showInfo('RACE.UPDATE.MESSAGE.INFO');
    const result = await lastValueFrom(
      this.raceService.updateRace({
        id: this.raceEdit._id,
        body: this.raceEdit,
      })
    ).catch((error) => {
      this.notificationService.showError(`RACE.UPDATE.MESSAGE.ERROR`);
    });

    if (result) {
      this.raceEdit = result;
      this.raceEvent.emit(this.raceEdit);
      this.notificationService.showSuccess(`RACE.UPDATE.MESSAGE.OK`);
    }
  }
}
