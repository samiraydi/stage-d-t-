import { Component, OnInit, Injector } from '@angular/core';
import { Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

// Component
import { DetailComponent } from 'accelengine-lib';

// Services
import { AccountService } from '@core/services/account.service';

// Models
import { Account, CIVILITY } from '@core/models/account.model';

// Helpers
import { APP_CONFIG } from '@app/app.config';
import { Logger } from 'accelengine-lib';

const log = new Logger('AccountListComponent');

@Component({
  templateUrl: 'account-detail.component.html',
})
export class AccountDetailComponent extends DetailComponent<Account> implements OnInit {

  initForm: boolean = true;

  civilitys = CIVILITY;

  constructor(
    injector: Injector,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService
  ) {
    super(injector, Account, accountService);

    this.activatedRoute.queryParams.subscribe(params => {
      this.currentId = Number(params['id']);
      this.initData();
    });

    // UI Customized Form Validation
    this.formGroup = this.formBuilder.group({
      username: [this.selectedData.username, [Validators.required]],
      email: [this.selectedData.email, [Validators.email, Validators.maxLength(50)]],
      profile: this.formBuilder.group({
        id: [this.selectedData.profile.id],
        civility: [this.selectedData.profile.civility],
        firstname: [this.selectedData.profile.firstname],
        lastname: [this.selectedData.profile.lastname],
        phone: [this.selectedData.profile.phone],
      }),
      /*
      address: this.formBuilder.group({
        id: [this.selectedData.address.id],
        addr: [this.selectedData.address.addr],
        postalCode: [this.selectedData.address.postalCode],
        city: [this.selectedData.address.city],
        country: [this.selectedData.address.country],
      })
      */
    });
  }

  ngOnInit(): void {
    log.debug('ngOnInit');
    this.initUI();
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
