import { Component, OnInit, Injector } from '@angular/core';
import { Validators } from '@angular/forms';

// Component
import { HybrideComponent } from 'accelengine-lib';
import { Column } from '@shared/components/data-table/data-table.model';

// Models
import { Menu } from '@core/models/menu.model';

// Services
import { MainMenuService } from '@core/services/mainmenu.service';

// Helpers
import { APP_CONFIG } from '@app/app.config';
import { Logger } from 'accelengine-lib';

const log = new Logger('MenuListComponent');

@Component({
  templateUrl: 'menu-master-detail.component.html',
  animations: APP_CONFIG.app.animations
})
export class MenuMasterDetailComponent extends HybrideComponent<Menu> implements OnInit {

  constructor(
    injector: Injector,
    private mainMenuService: MainMenuService
  ) {
    super(injector, Menu, mainMenuService, null);
    // UI Customized DataTable
    this.columns = Column.fromObjects([
      {
        field: 'parentCode',
        header: 'Parent',
        filter: true,
        sort: true
      }, {
        field: 'code',
        header: 'Code',
        filter: true,
      }, {
        field: 'label',
        header: 'Libellé ',
        filter: true,
      }
    ]);

    // don't change !!!
    this.pagination = false;
    //this.criteria = true;

    // UI Customized Form Validation
    this.formGroup = this.formBuilder.group({
      id: [this.selectedData.id],
      code: [this.selectedData.code, [Validators.required]],
      parentCode: [this.selectedData.parentCode],
      label: [this.selectedData.label, [Validators.required]],
      url: [this.selectedData.url],
      icon: [this.selectedData.icon]
    });
  }

  ngOnInit(): void {
    log.debug('ngOnInit');
    this.initUI();
    this.initData();
  }

  // Init
  initUI() {
    // Do not remove
    super.initUI();
    log.debug('Init UI');
  }

  initData() {
    // Do not remove
    super.initData();
    log.debug('Init Data');
  }
}
