import { Component, OnInit, Injector } from '@angular/core';
import { FormArray } from '@angular/forms';

// Component

// Models

// Helpers
import { FormPopupComponent, AECriteria, CodeNameEntity, Logger } from 'accelengine-lib';

const log = new Logger('CustomerCriteriaComponent');

@Component({
  templateUrl: 'criteria.component.html'
})
export class CriteriaComponent extends FormPopupComponent<AECriteria> implements OnInit {


  operations: CodeNameEntity[] = CodeNameEntity.fromObjects([
    {
      code: '==',
      name: 'Égal à',
    }, {
      code: '<',
      name: 'Inférieur à',
    }, {
      code: '>',
      name: 'Supérieur à',
    }
  ]);

  constructor(injector: Injector) {
    super(injector, AECriteria);

    this.formGroup = this.formBuilder.group({
      criterias: this.formBuilder.array([])
    });

    const control = <FormArray>this.formGroup.get('criterias');
    this.criterias.forEach(criteria => {
      control.push(this.initCriteria(criteria));
    });
  }

  ngOnInit() {
    log.info('ngOnInit', this.data);

  }

  initCriteria(criteria: AECriteria) {
    return this.formBuilder.group({
      field: [criteria.field],
      header: [criteria.header],
      operation: [criteria.operation],
      value: [criteria.value],
    })
  }

  getCriterias() {
    return (<FormArray>this.formGroup.get('criterias')).controls;
  }
}
