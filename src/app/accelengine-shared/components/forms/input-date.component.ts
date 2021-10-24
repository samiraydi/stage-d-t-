// Created by Skander-INTELLIJ

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import * as moment from "moment";
import { last, take, takeLast } from 'rxjs/operators';
import { InputForm } from './input-form';

@Component({
    selector: 'app-date-form',
    templateUrl: './input-date.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class InputDateComponent extends InputForm implements OnInit {

    @Input() dateFormat: string;

    dateString: string = '';
    dateValue: Date;

    constructor(private ref: ChangeDetectorRef) {
        super();
    }

    ngOnInit() {
        const self = this;
        self.getValueString(this.value.value);
        self.formGroup.get(this.name).valueChanges.subscribe(value => {
            self.getValueString(value);
        });
    }

    getValueString(date) {
        if (date !== null) {
            this.dateValue = new Date(date);
            this.dateString = moment(date).format(this.dateFormat);
        } else {
            this.dateValue = null;
            this.dateString = '';
        }
        this.ref.detectChanges();
    }

    onValueChangeDate(date) {
        this.formGroup.get(this.name).setValue(date);
        this.onChange.emit(date);
    }
}
