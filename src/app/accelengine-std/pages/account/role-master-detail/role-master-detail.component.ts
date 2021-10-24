import { Component, OnInit, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { remove } from 'lodash';

// Component
import { HybrideComponent } from 'accelengine-lib';
import { PermissionFormComponent } from '../permission-form/permission-form.component';

// Services
import { RoleService } from '@app/accelengine-std/services/role.service';
import { MainMenuService } from '@core/services/mainmenu.service';

// Models
import { Menu } from '@core/models/menu.model';
import { Role } from '@core/models/account.model';
import { Column } from '@shared/components/data-table/data-table.model';

// Helpers
import { APP_CONFIG } from '@app/app.config';
import { Logger } from 'accelengine-lib';
const log = new Logger('RoleListComponent');

@Component({
  templateUrl: 'role-master-detail.component.html',
  animations: APP_CONFIG.app.animations
})
export class RoleMasterDetailComponent extends HybrideComponent<Role> implements OnInit {

  dataMenus: Menu[] = [];
  columnsMenus: Column[];

  constructor(
    injector: Injector,
    private roleService: RoleService,
    private mainMenuService: MainMenuService
  ) {
    super(injector, Role, roleService, null);

    // UI Customized DataTable
    this.fixedColumns = Column.fromObjects([
      {
        field: 'id',
        header: 'ID',
        sort: true
      }
    ]);

    this.columns = Column.fromObjects([
      {
        field: 'code',
        header: 'Code',
        filter: true,
        sort: true
      }, {
        field: 'name',
        header: 'Nom'
      }
    ]);

    this.columnsChild = Column.fromObjects([
      {
        field: 'document.code',
        header: 'Document',
      },
      {
        field: 'action.name',
        header: 'Action',
      },
    ]);

    this.columnsMenus = Column.fromObjects([
      {
        field: 'code',
        header: 'Code',
      },
      {
        field: 'label',
        header: 'Libellé',
      },
    ]);

    this.pagination = false;
    //this.criteria = true;

    // UI Customized Form Validation
    this.formGroup = this.formBuilder.group({
      code: [this.selectedData.code, [Validators.required]],
      name: [this.selectedData.name, [Validators.required]]
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

    this.mainMenuService.getAll().subscribe(result => {
      log.debug(result);
      if (result) {
        this.dataMenus = result.datas;
      }
    });
  }

  // UI Customized Action
  onAddChildClick() {
    log.debug('Add Child Click');
    const self = this;
    super.addChild(PermissionFormComponent, 'Ajouter Permission').subscribe(permission => {
      self.selectedData.permissions.push(permission);
    });
  }

  onEditChildClick() {
    log.debug('Edit Child Click');
    const self = this;
    super.editChild(PermissionFormComponent, 'Modifier Permission').subscribe(permission => {
      Object.assign(self.selectedChildData, permission);
    });
  }

  onDeleteChildClick() {
    const self = this;
    super.deleteChild().subscribe(permission => {
      if (permission) {
        remove(self.selectedData.permissions, permission);
      }
    });
  }

  onMenuSelectedChanged(menus: Menu[]) {
  }

}
