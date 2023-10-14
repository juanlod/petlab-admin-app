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
import { Species } from 'src/app/api/models/master/species';
import { SpeciesService } from 'src/app/api/services/master/species.service';



@Component({
  selector: 'app-species-form',
  templateUrl: './species-form.component.html',
  styleUrls: ['./species-form.component.css'],
})
export class SpeciesFormComponent implements OnInit {

  @Output() specieEvent = new EventEmitter<object>();

  @Input() specie = new Species();

  @Input() specieEdit: Species = new Species();

  // SELECT DE COMBOS
  submitted: boolean = false;

  constructor(
    public specieService: SpeciesService,
    private notificationService: NotificationService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.specieEdit = Object.assign({}, this.specie);
  }

  /**
   * Guarda y actualiza un specie
   */
  async saveProvider(): Promise<void> {
    this.submitted = true;

    if (!this.specieEdit.nom) {
      return;
    }
    this.notificationService.showInfo('SPECIE.SAVE.MESSAGE.INFO');
    const result = await lastValueFrom(
      this.specieService.createSpecies({ body: this.specieEdit })
    ).catch((error) => {
      this.notificationService.showError(`SPECIE.SAVE.MESSAGE.ERROR`);
    });
    if (result) {
      this.specieEvent.emit(this.specieEdit);
      this.notificationService.showSuccess(`SPECIE.SAVE.MESSAGE.OK`);
    }
  }

  async updateProvider(): Promise<void> {
    // Actualiza un specie

    this.notificationService.showInfo('SPECIE.UPDATE.MESSAGE.INFO');
    const result = await lastValueFrom(
      this.specieService.updateSpecies({
        id: this.specieEdit._id,
        body: this.specieEdit,
      })
    ).catch((error) => {
      this.notificationService.showError(`SPECIE.UPDATE.MESSAGE.ERROR`);
    });

    if (result) {
      this.specieEdit = result;
      this.specieEvent.emit(this.specieEdit);
      this.notificationService.showSuccess(`SPECIE.UPDATE.MESSAGE.OK`);
    }
  }
}
