// Libs
import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

// Models
import { Column } from '../data-table.model';

// Component
import { DataTableComponent } from '../data-table.component';

// Helpers
import { Logger } from 'accelengine-lib';

const log = new Logger('DataTableComponent');

@Component({
  selector: 'app-data-table',
  templateUrl: './main-data-table.component.html',
  styleUrls: ['./main-data-table.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainDataTableComponent extends DataTableComponent implements OnInit, OnChanges {

  @Input() columns: Column[];
  @Input() value: any;
  @Input() paginator: boolean;
  @Input() showCurrentPageReport: boolean = false;
  @Input() loading: boolean = false;

  @Input() selectedData: any;

  @Output() onPageChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSelectRow: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDblclickRow: EventEmitter<any> = new EventEmitter<any>();

  @Output() onCheckedRowsChanged: EventEmitter<any> = new EventEmitter<any>();

  datas: any;
  totalRecords: number;
  firstLoad: boolean = true;

  constructor(public sanitizer: DomSanitizer) {
    super(sanitizer);
  }

  ngOnInit() {
  }

}
