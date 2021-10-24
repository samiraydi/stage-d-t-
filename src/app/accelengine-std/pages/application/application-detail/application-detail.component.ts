import { Component, OnInit, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { Validators, FormArray } from '@angular/forms';
import { map, filter, each } from 'lodash';

// Component
import { DetailComponent } from 'accelengine-lib';

// Models
import { Application, Module, Setting, VALUE_TYPE } from '@app/accelengine-std/models/application.model';

// Services
import { ApplicationService } from '@core/services/application.service';

// Helpers
import { environment } from '@env/environment';
import { Logger } from 'accelengine-lib';
const log = new Logger('AccountListComponent');

@Component({
  templateUrl: 'application-detail.component.html',
})
export class ApplicationDetailComponent extends DetailComponent<Application> implements OnInit {

  initForm: boolean = true;
  formIndex: number = -1;

  constructor(
    injector: Injector,
    private applicationService: ApplicationService
  ) {
    super(injector, Application, applicationService);

    this.currentId = 1;
    this.formGroup = this.formBuilder.group({
      code: [this.selectedData.code, [Validators.required]],
      name: [this.selectedData.name, [Validators.required]],
      description: [this.selectedData.description, [Validators.required]],
      version: [this.selectedData.version, [Validators.required]],
      databaseName: [this.selectedData.databaseName, [Validators.required]],
      databaseVersion: [this.selectedData.databaseVersion, [Validators.required]],
      databaseURL: [this.selectedData.databaseURL, [Validators.required]],
      driverName: [this.selectedData.driverName, [Validators.required]],
      driverVersion: [this.selectedData.driverVersion, [Validators.required]],
      settings: this.formBuilder.array([])
    });
  }

  get settingsArray() {
    return (<FormArray>this.formGroup.get('settings')).controls;
  }

  settingsArrayByModule(moduleName: string) {
    let settings = (<FormArray>this.formGroup.get('settings')).controls;
    return filter(settings, function (setting) { return setting.value.module === moduleName; });
  }

  initSetting(setting: Setting, formIndex: number) {
    return this.formBuilder.group({
      formIndex: [formIndex, Validators.required],
      id: [setting.id, Validators.required],
      code: [setting.code, Validators.required],
      name: [setting.name, Validators.required],
      type: [setting.type, Validators.required],
      valueString: [setting.valueString],
      valueNumber: [setting.valueNumber],
      valueBoolean: [setting.valueBoolean],
      displayOrder: [setting.displayOrder],
      module: [setting.module, Validators.required]
    });
  }

  addSetting(setting: Setting) {
    const control = <FormArray>this.formGroup.controls['settings'];
    control.push(this.initSetting(setting, ++this.formIndex));
  }

  ngOnInit(): void {
    log.debug('ngOnInit');
    this.initUI();
    this.initData();
  }

  // Init
  initUI() {
    // Do not add super.initUI();
    // Do not change
    log.debug('Init UI');
    // Do not remove
    this.isEdit = false;
    this.menuSaveService.showSave.next(false);
    this.menuSaveService.isValide.next(false);
    this.isSubmitted = false;
  }

  initData() {
    // Do not remove
    super.initData();
    log.debug('Init Data');
  }

  initDataOK() {
    log.info('initDataOK', this.initForm);
    if (this.initForm) {
      const self = this;
      self.selectedData.modules.map(module => {
        module.settings.map(setting => {
          setting.module = module.name;
          self.addSetting(setting);
        });
      });

      this.initForm = false;
    }
  }

  validation(): Observable<boolean> {
    log.info('validation');
    return Observable.create(observer => {
      this.isSubmitted = true;
      if (this.formGroup.invalid) {
        log.debug('Validation KO');
        if (!environment.production) {
          this.findInvalidControls();
        }
        observer.next(false);
        observer.complete();
      } else {
        log.debug('Validation OK');
        const self = this;
        each(this.selectedData.modules, function (module: Module) {
          module.settings = filter(self.formGroup.value.settings, function (setting) { return setting.module === module.name; });
        });

        observer.next(true);
        observer.complete();
      }
    })
  }

  isTypeString(setting: Setting) {
    return setting.type == VALUE_TYPE.STRING;
  }

  isTypeNumber(setting: Setting) {
    return setting.type == VALUE_TYPE.NUMBER;
  }

  isTypeBoolean(setting: Setting) {
    return setting.type == VALUE_TYPE.BOOLEAN;
  }
}
