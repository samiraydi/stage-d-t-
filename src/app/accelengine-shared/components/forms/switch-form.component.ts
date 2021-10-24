import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InputForm } from './input-form';

// Helpers
//import { APP_CONFIG } from '@app/app.config';

@Component({
  selector: 'app-switch-form',
  templateUrl: './switch-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwitchFormComponent extends InputForm {

  checked: boolean = false;

  constructor() {
    super();
  }

}
