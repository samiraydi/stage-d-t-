import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { InputForm } from './input-form';
import * as moment from 'moment';

// Helpers
//import { APP_CONFIG } from '@app/app.config';

@Component({
  selector: 'app-file-form',
  templateUrl: './file-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileFormComponent extends InputForm {

  @Input() accept: string;

  constructor() {
    super();
  }

  onFileChange(event) {
    let file = {};
    file[this.name] = null;
    if (event.currentFiles.length > 0) {
      file[this.name] = event.currentFiles[0];
    }
    this.formGroup.patchValue(file);
  }

  onRemove(event) {
    let file = {};
    file[this.name] = null;
    this.formGroup.patchValue(file);
  }


}
