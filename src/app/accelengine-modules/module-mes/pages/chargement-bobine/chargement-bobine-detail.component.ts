import { Component, OnInit, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import * as _ from 'lodash';
import { Observable, Subscription, timer } from 'rxjs';

// Component
import { HybrideComponent, Logger } from 'accelengine-lib';

// Models
import { Bobine } from '../../models/bobine.model';

// Service';
import { ChargementBobineSoapService } from '../../services/chargement-bobine.soap.service';
import { StorageService } from '@app/accelengine-core/services/storage.service';

// Components
import { Column } from '@shared/components/data-table/data-table.model';
import { CriteriaComponent } from '@shared/components/criteria/criteria.component';

// Helpers
import { APP_CONFIG } from '@app/app.config';

const log = new Logger('ChargementBobineMasterDetailComponent');

@Component({
    templateUrl: 'chargement-bobine-master-detail.component.html',
    styleUrls: ['./chargement-bobine-master-detail.scss'],
    animations: APP_CONFIG.app.animations
})
export class ChargementBobineMasterDetailComponent extends HybrideComponent<Bobine> implements OnInit {

    options: any;
    data: any;
    devidoirs: any[];
    bobActif: any;
    inputDisabled: boolean = false;
    Indicateur: any[];


    subscription: Subscription;
    constructor(
        injector: Injector,
        private chargementSoapService: ChargementBobineSoapService,
        private sotrageService: StorageService
    ) {
        super(injector, Bobine, null, CriteriaComponent);

        // UI Customized DataTable
        this.columns = Column.fromObjects([
            {
                field: 'site',
                header: 'Site',
                filter: true,
            }, {
                field: 'emplacement',
                header: 'Emplacement',
                filter: true,
            }, {
                field: 'numBobine',
                header: 'Numéro Bobine',
                nbrCol: 5,
            }, {
                field: 'quantite',
                header: 'Quantité',
            },
            {
                field: 'statut',
                header: 'Date Déclaration',
            }
        ]);

        this.pagination = true;
        this.criteria = false;

        this.bobActif = {
            lot: "-",
            ref: "-",
            serial: "",
            data: {
                labels: ['Vide'],
                datasets: [
                    {
                        data: [999, 0],
                        backgroundColor: [
                            "#dbdfe4",
                            "#93b3c6"
                        ],
                        hoverBackgroundColor: [
                            "#dbdfe4",
                            "#93b3c6"
                        ]
                    }]
            }
        }
        // UI Customized Form Validation
        this.formGroup = this.formBuilder.group({
            of: [this.selectedData.of],
            article: [this.selectedData.article],
            description: [this.selectedData.description],
            statut: [this.selectedData.statut],
            um: [this.selectedData.um],
            grammage: [this.selectedData.grammage],
            diametre: [this.selectedData.diametre],
            laize: [this.selectedData.laize],
            poidsMoyen: [this.selectedData.poidsMoyen],
            metrage: [this.selectedData.metrage],
        });

        this.options = {
            responsive: true,
            maintainAspectRatio: false
        };

    }




    getOf() {
        let nbr = this.formGroup.get('of').value;
        if (nbr != null) {
            this.chargementSoapService.getBobine(nbr).subscribe(
                result => {
                  this.bobActif=result ; 
                })
        }
    }


    play(event) {
        log.debug("play/pause confirm")
        if (event.checked) {
            this.confirmPopup("Démarrage", "pi pi-power-off", "Démarrer les devidoir ?").subscribe(result => {
                if (result) {
                    this.messageService.add({ severity: 'success', summary: 'Démarrer', detail: 'Dévidoir lancer' });
                }

            });
        }
        else {
            this.confirmPopup("Arret/Pause", "pi pi-power-off", "Arreter les devidoir ?").subscribe(result => {
                if (result) {
                    this.messageService.add({ severity: 'error', summary: 'Arreter', detail: 'Dévidoir arreter' });
                }

            });
        }
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