// Libs
import { Component, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

// Models

// Component
import { DataTableComponent } from '../data-table.component';

// Helpers
import { Logger } from 'accelengine-lib';

const log = new Logger('DataTableComponent');

@Component({
  selector: 'app-selectable-data-table',
  templateUrl: './selectable-data-table.component.html',
  styleUrls: ['./selectable-data-table.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectableDataTableComponent extends DataTableComponent implements OnInit, OnChanges {

  @Output() selectedDataChange = new EventEmitter<number>();

  constructor(public sanitizer: DomSanitizer) {
    super(sanitizer);
  }

  ngOnInit() {
  }

  onRowSelect(event) {
    if (!this.isDisabled)
      this.selectedDataChange.emit(this.selectedData);
  }

  onRowUnselect(event) {
    if (!this.isDisabled)
      this.selectedDataChange.emit(this.selectedData);
  }

}
