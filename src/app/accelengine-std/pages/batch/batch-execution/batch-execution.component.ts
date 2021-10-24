import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { Validators } from '@angular/forms';

// Component
import { HybrideComponent } from 'accelengine-lib';
import { Column, ColumnType } from '@shared/components/data-table/data-table.model';

// Models
import { BatchExecution } from '@app/accelengine-std/models/batch.model';

// Services
import { BatchExecutionService } from '@app/accelengine-std/services/batch.execution.service';
import { BatchsWebsocketService } from '@app/accelengine-std/services/batchs.websocket.service';

// Helpers
import { APP_CONFIG } from '@app/app.config';
import { Logger } from 'accelengine-lib';


const log = new Logger('BatchExecutionComponent');

@Component({
  templateUrl: 'batch-execution.component.html',
  styleUrls: ['./batch-execution.component.scss'],
  animations: APP_CONFIG.app.animations
})
export class BatchExecutionComponent extends HybrideComponent<BatchExecution> implements OnInit, OnDestroy {

  fileLogContent: string;
  fileErrorContent: string;

  constructor(
    injector: Injector,
    private batchExecutionService: BatchExecutionService,
    private batchsWebsocketService: BatchsWebsocketService
  ) {
    super(injector, BatchExecution, batchExecutionService, null);
    // UI Customized DataTable
    this.columns = Column.fromObjects([
      {
        field: 'name',
        header: 'Nom',
        filter: true,
        nbrCol: 2,
      }, {
        field: 'description',
        header: 'Description',
        nbrCol: 4,
      }, {
        field: 'startTime',
        header: 'Début',
        type: ColumnType.DATETIME,
        format: 'DD/MM/YYYY hh:mm:ss',
        nbrCol: 2,
      }, {
        field: 'endTime',
        header: 'Fin',
        type: ColumnType.DATETIME,
        format: 'DD/MM/YYYY hh:mm:ss',
        nbrCol: 2,
      }, {
        field: 'status',
        header: 'Statut',
        filter: true,
        nbrCol: 2,
      }
    ]);

    this.pagination = true;
    //this.criteria = true;

    // UI Customized Form Validation
    this.formGroup = this.formBuilder.group({
      id: [this.selectedData.id],
      name: [this.selectedData.name],
      description: [this.selectedData.description],
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
    log.debug('Init Data');
    // Do not remove
    super.initData();
    const subscribe = this.batchsWebsocketService.getObservable().subscribe({
      next: this.onBatchUpdated,
      error: err => {
        log.error(err);
      }
    });
    this.subscriptions.push(subscribe);

  }

  private onBatchUpdated = data => {
    if (data.type === 'SUCCESS') {
      this.datas = data.message
    }
  }

  onDblclickRow(row: BatchExecution) {
    super.onDblclickRow(row);

    this.fileLogContent = null;
    this.fileErrorContent = null;

    if (row.fileLogPath != "") {
      const subscribe = this.batchExecutionService.getBatchLog(row.id).subscribe(result => {
        if (result) {
          this.fileLogContent = result;
        }
      });
      this.subscriptions.push(subscribe);
    }

    if (row.fileErrorPath != "") {
      const subscribe2 = this.batchExecutionService.getBatchError(row.id).subscribe(result => {
        if (result) {
          this.fileErrorContent = result;
        }
      });
      this.subscriptions.push(subscribe2);
    }
  }

  ngOnDestroy() {
    /**
     *  Unsubscribe from events
     */
    log.debug('On Destroy');
    this.batchsWebsocketService.disconnect();
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
