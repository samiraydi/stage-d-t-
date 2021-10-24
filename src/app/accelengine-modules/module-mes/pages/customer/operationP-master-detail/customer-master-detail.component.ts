import { Component, OnInit, Injector } from '@angular/core';
import { Validators } from '@angular/forms';

// Component
import { AECriteria, HybrideComponent, Logger } from 'accelengine-lib';

// Models
import { Customer } from '../../../models/customer.model';

// Services
import { CustomerService } from '../../../services/customer.service';

// Components
import { Column, ColumnType } from '@shared/components/data-table/data-table.model';
import { CriteriaComponent } from '@shared/components/criteria/criteria.component';

// Helpers
import { APP_CONFIG } from '@app/app.config';
import { ChargementBobineSoapService } from '@app/accelengine-modules/module-mes/services/chargement-bobine.soap.service';
//import { LinksSoapService } from '@app/accelengine-modules/module-mes/services/links.service.soap.service';
import { DatasSoapService } from '@app/accelengine-modules/module-mes/services/datas.service.soap.service';
//import { wrModel } from '@app/accelengine-modules/module-mes/models/data.model';
import { DatasModel } from '@app/accelengine-modules/module-mes/models/datas.model';

const log = new Logger('CustomerMasterDetailComponent');

@Component({
    templateUrl: 'customer-master-detail.component.html',
    animations: APP_CONFIG.app.animations
})
export class CustomerMasterDetailComponent extends HybrideComponent<DatasModel> implements OnInit {


    Source:any


    constructor(
        injector: Injector,
        private customerService: CustomerService,
       // private linkServiceSoap:LinksSoapService,
        private datasSoapService : DatasSoapService
    ) {
        super(injector, Customer, customerService, CriteriaComponent);

        // UI Customized DataTable
        this.columns = Column.fromObjects([
            {
                field: 'id',
                header: 'id',
                filter: true,
            }, {
                field: 'lot',
                header: 'lot',
                filter: true,
            }, {
                field: 'start_date',
                header: 'start_date',
                filter: true,
                //nbrCol: 5,
            }
        ]);

        this.pagination = true;
        this.criteria = true;
        this.criterias = AECriteria.fromObjects([
            {
                label: 'Code',
                code: 'code',
                operation: '==',
                value: ''
            },
            {
                label: 'Nom',
                code: 'name',
                operation: '==',
                value: ''
            }
        ]);


        // UI Customized Form Validation
        this.formGroup = this.formBuilder.group({
            nbr: [this.selectedData.nbr],
            lot: [this.selectedData.lot],
            start_date: [this.selectedData.start_date]
        });


        
    }

    getData(){
        this.datasSoapService.getData().subscribe(data =>
            { this.Source=data;
                if(data)
                {
                    let wr : DatasModel[] ;
                    wr=data;
                    console.log(wr);
                    // console.log(wr[0].operation);
                    // console.log(wr[0].nbr);
                    // console.log(this.Source)
                }
            });
   }
    ngOnInit(): void {
        //this.getData();
        log.debug('ngOnInit');
        this.initUI();
        this.initData();
        // this.Source=this.data;
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
        this.datasSoapService.getData().subscribe(data =>
            {
                if(data)
                {
                    this.Source=data ; 
                    console.log(this.Source)
                }
            });
    }

}