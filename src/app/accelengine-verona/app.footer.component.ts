import { Component, OnInit } from '@angular/core';

// Models
import { Application } from '@app/accelengine-std/models/application.model';

// Services
import { MenuSaveService } from 'accelengine-lib';
import { StorageService } from '@core/services/storage.service';

// Helpers
import { APP_CONFIG } from '@app/app.config';

@Component({
  selector: 'app-footer',
  templateUrl: './app.footer.component.html'
})
export class AppFooterComponent implements OnInit {
  application: Application;
  showSave: boolean = false;
  isValide: boolean = false;

  constructor(
    private menuSaveService: MenuSaveService,
    private storageService: StorageService) {

    this.menuSaveService.showSave.subscribe(showSave => {
      this.showSave = showSave;
      //this.cdRef.detectChanges();
    });

    this.menuSaveService.isValide.subscribe(isValide => {
      this.isValide = isValide;
      //this.cdRef.detectChanges();
    });
  }

  ngOnInit() {
    this.application = this.storageService.getCurentApp();
  }

  onSaveClick($event) {
    this.menuSaveService.onClick.next($event);
  }
}
