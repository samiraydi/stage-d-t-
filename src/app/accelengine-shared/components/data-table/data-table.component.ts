// Libs
import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { APP_CONFIG } from '@app/app.config';

// Helpers
import { Logger } from 'accelengine-lib';
import { each, split } from 'lodash';
import * as moment from 'moment';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
// Models
import { Column, ColumnType } from './data-table.model';

const log = new Logger('DataTableComponent');

@Component({ template: '' })
export class DataTableComponent {

  @Input() columns: Column[];
  @Input() fixedColumns: Column[];
  @Input() fixedWidth: any = '300px';
  @Input() value: any;
  @Input() paginator: boolean;
  @Input() loading: boolean = false;
  @Input() selectedData: any;
  @Input() isDisabled: boolean = false;
  @Input() stateKey: string = 'DATATABLE';
  @Input() export: boolean = true;

  @Output() onPageChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSelectRow: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDblclickRow: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCheckedRowsChanged: EventEmitter<any> = new EventEmitter<any>();

  allColumns: Column[] = [];
  datas: any;
  filteredDatas: any;
  totalRecords: number;

  public rows: number = 50;
  public rowsPerPageOptions: number[] = [50, 100, 500];

  public CSVFilename: string;

  constructor(public sanitizer: DomSanitizer) {
  }

  ngOnChanges(changes: SimpleChanges) {

    if (this.fixedColumns) {
      this.allColumns = [...this.fixedColumns, ...this.columns];
    } else {
      this.allColumns = this.columns;
    }

    if (changes.value && this.value) {
      if (this.value.datas) {
        this.datas = this.value.datas;
        this.totalRecords = this.value.totalRecords;
      } else {
        this.datas = this.value;
      }
    }
  }

  onPageChange(event: LazyLoadEvent) {
    const currentPage = event.first / event.rows;
    const pageSize = event.rows;
    this.onPageChanged.emit(currentPage + ',' + pageSize);
  }

  getData(data: any, column: Column) {
    const value = this.processingData(data, column);
    return this.formattingData(value, column);
  }

  processingData(data: any, column: Column) {
    if (column.field == undefined || column.field == null) {
      return data;
    }

    if (column.field.includes('.')) {
      let codes = split(column.field, '.');
      let res = data;
      each(codes, function (field) {
        res = res[field];
        if (res === undefined) {
          res = '';
          return false;
        }
      });
      return res
    }

    return data[column.field];
  }

  formattingData(value: any, column: Column) {

    // Set empty table cell height 100%
    if (value == null) {
      return '&nbsp;'
    }

    if (column.type === ColumnType.BOOLEAN) {
      if (value) {
        return '<i class="fa fa-check fa-lg pr-3"></i>';
      } else
        return '<i class="fa fa-times fa-lg pr-3"></i>';
    }

    if (column.type === ColumnType.FILE) {
      if (column.url) {
        return '<a href="' + column.url + '/' + value + '" class="p-button-info" target="_blank"><i class="fas fa-download fa-lg"></i></a>';
      } else {
        return '<a href="' + APP_CONFIG.apiBaseUrl + '/file/src/' + value + '" class="p-button-info" target="_blank"><i class="fas fa-download fa-lg"></i></a>';
      }

    }

    if (column.type === ColumnType.DATETIME) {
      var newDate = moment(value);

      if (column.format !== undefined) {
        return newDate.format(column.format);
      }
      return newDate.format();
    }

    if (column.type === ColumnType.COLOR) {
      if (value) {
        return this.sanitizer.bypassSecurityTrustHtml('<div style="background-color: ' + value + ';">&nbsp;</div>');
      }
    }

    if (column.lists !== undefined) {
      const columnValue = column.lists.find(x => x.code === value);
      if (columnValue) {
        return columnValue.label;
      }
    }

    return value;
  }


  click(data: any) {
    if (!this.isDisabled)
      this.onSelectRow.emit(data);
  }

  dblclick(data: any) {
    if (!this.isDisabled)
      this.onDblclickRow.emit(data);
  }

  onFilter(event, dt) {
    this.filteredDatas = event.filteredValue;
  }

  exportCSV(table) {
    this.CSVFilename = this.stateKey + '_export_' + new Date().getTime();
    setTimeout(() => {
      table.exportCSV();
    }, 500);
  }

  exportPdf() {
    import("jspdf").then(jsPDF => {
      import("jspdf-autotable").then(x => {
        const doc = new jsPDF.default(0, 0);
        let exportColumns = this.allColumns.map(col => ({ title: col.header, dataKey: col.field }));
        doc.autoTable(exportColumns, this.filteredDatas);
        doc.save(this.stateKey + '_export_' + new Date().getTime() + '.pdf');
      })
    })
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.filteredDatas, { header: ['id'] });
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, this.stateKey);
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + '.xlsx');
    });
  }

  goToLink(url: string) {
    window.open(url, "_blank");
  }
}
