import { Component, OnInit, Injector } from '@angular/core';
import { Validators } from '@angular/forms';

// Models
import { Action, Document, Permission } from '@core/models/account.model';

// Services
import { RoleService } from '@app/accelengine-std/services/role.service';

// Component
import { FormComponent, FormPopupComponent } from 'accelengine-lib';

// Helpers
import { Logger } from 'accelengine-lib';
const log = new Logger('PermissionFormComponent');

@Component({
  templateUrl: 'permission-form.component.html'
})
export class PermissionFormComponent extends FormPopupComponent<Permission> implements OnInit {

  documents: Document[] = [];
  actions: Action[] = [];

  constructor(injector: Injector,
    private roleService: RoleService) {
    super(injector, Permission);

    this.formGroup = this.formBuilder.group({
      document: [this.data.document, [Validators.required]],
      action: [this.data.action, [Validators.required]]
    });

  }

  ngOnInit() {
    log.info('ngOnInit PermissionFormComponent', this.data);

    this.roleService.getDocuments().subscribe(result => {
      log.debug(result);
      if (result) {
        this.documents = result.datas;
      }
    });

    this.roleService.getActions().subscribe(result => {
      log.debug(result);
      if (result) {
        this.actions = result.datas;
      }
    });

    if (this.data) {
      this.formGroup.patchValue(this.data);
    }

  }
}
