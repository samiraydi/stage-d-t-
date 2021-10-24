import { Component, Input, Output, EventEmitter, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { InputForm } from './input-form';
import { FormControl } from '@angular/forms';
import { filter } from 'lodash';

// Helpers
//import { APP_CONFIG } from '@app/app.config';

@Component({
  selector: 'app-select-form',
  templateUrl: './select-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectFormComponent extends InputForm {

  @Input() label: string = '';
  @Input() values: any[] = [];
  @Input() placeholder: string;
  @Input() displayField: string;
  @Input() returnValue: string;
  @Input() isSubmitted: boolean = false;
  @Input() isDisabled: boolean;
  @Input() group: boolean;

  constructor() {
    super();
  }
}
