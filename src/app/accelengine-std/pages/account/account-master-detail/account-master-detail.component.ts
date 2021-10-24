import { Component, OnInit, Injector } from '@angular/core';
import { Validators } from '@angular/forms';

// Component
import { HybrideComponent } from 'accelengine-lib';

// Models
import { Account, Role } from '@core/models/account.model';
import { Column } from '@shared/components/data-table/data-table.model';

// Services
import { AccountService } from '@core/services/account.service';
import { RoleService } from '@app/accelengine-std/services/role.service';

// Helpers
import { PaswordValidator } from '@core/helpers/validators/pasword.validator';
import { APP_CONFIG } from '@app/app.config';
import { Logger } from 'accelengine-lib';

const log = new Logger('AccountListComponent');

@Component({
  templateUrl: 'account-master-detail.component.html',
  animations: APP_CONFIG.app.animations
})
export class AccountMasterDetailComponent extends HybrideComponent<Account> implements OnInit {

  public roles: Role[] = [];

  constructor(
    injector: Injector,
    private accountService: AccountService,
    private roleService: RoleService
  ) {
    super(injector, Account, accountService, null);
    // UI Customized DataTable
    this.fixedColumns = Column.fromObjects([
      {
        field: 'id',
        header: 'ID',
      }
    ]);

    this.columns = Column.fromObjects([
      {
        field: 'username',
        header: 'Username',
        filter: true,
        nbrCol: 6,
      }, {
        field: 'email',
        header: 'Email',
        filter: true,
        nbrCol: 6,
      }
    ]);

    this.columnsChild = Column.fromObjects([
      {
        field: 'code',
        header: 'Code'
      }, {
        field: 'name',
        header: 'Nom'
      }
    ]);

    this.pagination = false;
    //this.criteria = true;

    // UI Customized Form Validation
    this.formGroup = this.formBuilder.group({
      id: [this.selectedData.id],
      username: [this.selectedData.username, [Validators.required]],
      password: [this.selectedData.password],
      email: [this.selectedData.email, [Validators.email]],
      activated: [this.selectedData.activated]
    }, {
      validator: PaswordValidator('password')
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

    this.roleService.getAll().subscribe((result) => {
      log.debug(result);
      if (result) {
        this.roles = result.datas;
      }
    });
  }

  // UI Customized Action

}
