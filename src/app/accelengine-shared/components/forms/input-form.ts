import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  template: ''
})
export class InputForm {

  @Input() formGroup: FormGroup;
  @Input() name: string = '';
  @Input() value: any;
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() help: string = '';
  @Input() isSubmitted: boolean = false;
  @Input() isDisabled: boolean;
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  getErrors() {
    if (this.value)
      return this.value.errors;
    else
      return false;
  }

  isRequired() {
    if (this.formGroup) {
      const form_field = this.formGroup.get(this.name);
      if (form_field == null || form_field.validator == null) {
        return false;
      }
      const validator = form_field.validator({} as AbstractControl);
      return (validator && validator.required);
    }
  }

  onValueChange(value) {
    this.onChange.emit(value);
  }

  getValue(value: FormControl) {
    if (value && value.value !== null) {
      return value.value;
    } else {
      return '';
    }
  }
}
