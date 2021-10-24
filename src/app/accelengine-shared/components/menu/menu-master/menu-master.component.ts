import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu-master',
  templateUrl: './menu-master.component.html'
})
export class MenuMasterComponent {
  @Input() criteria: boolean = false;
  @Input() displayAdd: boolean = true;

  @Output() addClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() criteriaClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() reloadClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  onAddClick() {
    this.addClick.emit(true);
  }


  onCriteriaClick() {
    this.criteriaClick.emit(true);
  }

  onReloadClick() {
    this.reloadClick.emit(true);
  }

}
