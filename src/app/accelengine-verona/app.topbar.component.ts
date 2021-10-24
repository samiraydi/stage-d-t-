import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Models
import { Account } from '@core/models/account.model';
import { Application } from '@app/accelengine-std/models/application.model';

// Component
import { AppMainComponent } from './app.main.component';

// Services
import { AuthenticationService } from '@core/services/authentication.service';
import { StorageService } from '@core/services/storage.service';


// Helpers
//import { APP_CONFIG } from '@app/app.config';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {

  public application: Application = new Application();
  public account: Account = new Account();

  constructor(
    public app: AppMainComponent,
    private authenticationService: AuthenticationService,
    private storageService: StorageService,
    private router: Router) {
  }

  ngOnInit() {
    const self = this;
    this.storageService.getItemAsync(StorageService.CURRENT_APP).then(function (value) {
      self.application = value;
    });

    this.storageService.getItemAsync(StorageService.CURRENT_ACCOUNT).then(function (value) {
      self.account = value;
    });
  }

  public goProfile(event) {
    event.preventDefault();
    this.router.navigate(['std/access/account/detail'], { queryParams: { id: this.account.id } });
  }

  public goSetting(event) {
    event.preventDefault();
    this.router.navigate(['std/access/account/setting'], { queryParams: { id: this.account.id } });
  }

  public doLogout(event) {
    event.preventDefault();
    this.authenticationService.logout(true);
  }
}
