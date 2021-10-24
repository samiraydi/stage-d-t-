import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { InputForm } from './input-form';
import * as moment from 'moment';

// Helpers
//import { APP_CONFIG } from '@app/app.config';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputFormComponent extends InputForm {

  @Input() type: string = 'text';
  @Input() appendRight: string;
  @Input() appendLeft: string;
  @Input() iconRight: string;
  @Input() iconLeft: string;

  constructor() {
    super();
  }

}
