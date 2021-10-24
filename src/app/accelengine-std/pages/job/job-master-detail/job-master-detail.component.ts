import { Component, OnInit, Injector } from '@angular/core';
import { Validators } from '@angular/forms';

// Component
import { AECriteria, HybrideComponent } from 'accelengine-lib';
import { CriteriaComponent } from '@shared/components/criteria/criteria.component';

// Models
import { Job } from '@app/accelengine-std/models/job.model';
import { Column, ColumnType } from '@shared/components/data-table/data-table.model';

// Services
import { JobService } from '@app/accelengine-std/services/job.service';

// Helpers
import { APP_CONFIG } from '@app/app.config';
import { Logger } from 'accelengine-lib';

const log = new Logger('JobMasterDetailComponent');

@Component({
  templateUrl: 'job-master-detail.component.html',
  animations: APP_CONFIG.app.animations
})
export class JobMasterDetailComponent extends HybrideComponent<Job> implements OnInit {

  constructor(
    injector: Injector,
    private articleService: JobService
  ) {
    super(injector, Job, articleService, CriteriaComponent);

    // UI Customized DataTable
    this.columns = Column.fromObjects([
      {
        field: 'name',
        header: 'Nom',
        filter: true,
        nbrCol: 4,
      }, {
        field: 'groupName',
        header: 'Groupe',
        filter: true,
        nbrCol: 4,
      }, {
        field: 'cron',
        header: 'Cron',
        type: ColumnType.BOOLEAN,
        nbrCol: 2,
      }, {
        field: 'status',
        header: 'Statut',
        type: ColumnType.BOOLEAN,
        nbrCol: 2,
      }
    ]);

    this.pagination = true;
    this.criteria = true;
    this.criterias = AECriteria.fromObjects([
      {
        field: 'name',
        header: 'Nom',
        operation: '==',
        value: ''
      }, {
        field: 'groupName',
        header: 'Groupe',
        operation: '==',
        value: ''
      }
    ]);

    // UI Customized Form Validation
    this.formGroup = this.formBuilder.group({
      id: [this.selectedData.id],
      name: [this.selectedData.name, [Validators.required]],
      groupName: [this.selectedData.groupName, [Validators.required]],
      className: [this.selectedData.className, [Validators.required]],
      cronExpression: [this.selectedData.cronExpression],
      repeatTime: [this.selectedData.repeatTime],
      cron: [this.selectedData.cron],
      status: [this.selectedData.status]
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