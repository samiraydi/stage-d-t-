import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InputForm } from './input-form';

// Helpers
//import { APP_CONFIG } from '@app/app.config';

@Component({
  selector: 'app-input-textarea-form',
  templateUrl: './input-textarea-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputTextareaFormComponent extends InputForm {

  @Input() rows: any;

  constructor() {
    super();
  }

}
