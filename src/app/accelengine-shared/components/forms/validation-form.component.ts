import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

// Helpers
//import { APP_CONFIG } from '@app/app.config';

@Component({
  selector: 'app-validation-form',
  templateUrl: './validation-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class InputValidationComponent {
  @Input() value: any;

  constructor() {
  }

  getErrors() {
    if (this.value)
      return this.value.errors;
    else
      return false;
  }
}
